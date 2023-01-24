// components/welCropper.js

// 获取显示区域长宽
const device = wx.getSystemInfoSync()
const W = device.windowWidth
const H = device.windowHeight - 50

let cropperUtil = require('./welCropperUtil.js')

Component({
    properties: {
        cropperOptions: {
            type: Object,
            value: null,
            observer: function(newVal, oldVal) {
                let z = this
                console.log(newVal)
                if (z.data.ready) {
                    z.showCropper({
                        src: newVal.src,
                        mode: newVal.mode,
                        sizeType: newVal.sizeType, //'original'(default) | 'compressed'
                        callback: function(res) {
                            z.cropDone(res)
                        }
                    })
                }
            }
        },
    },
    data: {
        ready: false,
        cropperData: {
            drawSign: 0,
            hidden: true,
            left: 0,
            top: 0,
            width: W,
            height: H,
            W: W,
            H: H,
            itemLength: 50,
            imageInfo: {
                path: '',
                width: 0,
                height: 0
            },
            scaleInfo: {
                x: 1,
                y: 1
            },
            cropCallback: null,
            sizeType: ['original', 'compressed'], //'original'(default) | 'compressed'
            original: false, // 默认压缩，压缩比例为截图的0.4
            mode: 'rectangle', //默认矩形
        },
        moveItems: {
            topleft: {
                x: 50,
                y: 50
            },
            topright: {
                x: W - 50,
                y: 50
            },
            bottomleft: {
                x: 50,
                y: H - 50
            },
            bottomright: {
                x: W - 50,
                y: H - 50
            }
        },
        changableData: {
            canCrop: true,
            shapeEnable: false,
            rotateDegree: 0,
            originalSize: {
                width: 0,
                height: 0
            },
            scaleSize: {
                width: 0,
                height: 0
            },
            shape: {
                x: 1.0,
                y: 1.0
            },
            previewImageInfo: {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            }
        }
    },
    ready: function() {
        this.setData({
            ready: true
        })
    },
    methods: {
        cropDone: function(res) {
            var myEventDetail = {
                res: res
            } // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('cropdown', myEventDetail, myEventOption)
        },
        // 显示cropper，如果有图片则载入
        showCropper: function(options) {
            console.log(options)
            let z = this
            let cropperData = z.data.cropperData
            let {
                src,
                callback,
                sizeType,
                mode
            } = options

            let filterType = []
            if (sizeType.indexOf('original') > -1) {
                filterType.push('original')
            }
            if (sizeType.indexOf('compressed') > -1) {
                filterType.push('compressed')
            }
            if (filterType.length == 1 && filterType.indexOf('original') > -1) {
                cropperData.original = true
            }

            if (mode) {
                cropperData.mode = mode
            }
            cropperData.hidden = false
            cropperData.hash = Math.random()
            cropperData.cropCallback = callback
            cropperData.sizeType = filterType

            if (src) {
                wx.getImageInfo({
                    src: src,
                    success: function(res) {
                        var w = res.width,
                            h = res.height

                        cropperData.imageInfo = {
                            path: src,
                            width: w,
                            height: h
                        }
                        z.setData({
                            cropperData: cropperData,
                            moveItems: {
                                topleft: {
                                    x: 0,
                                    y: 0
                                },
                                topright: {
                                    x: 0,
                                    y: 0
                                },
                                bottomleft: {
                                    x: 0,
                                    y: 0
                                },
                                bottomright: {
                                    x: 0,
                                    y: 0
                                }
                            }
                        })

                        setTimeout(() => {
                            z.loadImage(src, w, h, false)
                        }, 100)
                    }
                })
            }
        },

        // 隐藏cropper
        hideCropper: function() {
            let z = this

            z.data.cropperData.hidden = true
            z.data.cropperData.cropCallback = null

            z.setData({
                cropperData: z.data.cropperData,
                moveItems: {
                    topleft: {
                        x: -1,
                        y: -1
                    },
                    topright: {
                        x: -1,
                        y: -1
                    },
                    bottomleft: {
                        x: -1,
                        y: -1
                    },
                    bottomright: {
                        x: -1,
                        y: -1
                    }
                },
                changableData: {
                    canCrop: true,
                    shapeEnable: false,
                    rotateDegree: 0,
                    originalSize: {
                        width: 0,
                        height: 0
                    },
                    scaleSize: {
                        width: 0,
                        height: 0
                    },
                    shape: {
                        x: 1.0,
                        y: 1.0
                    },
                    previewImageInfo: {
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0
                    }
                }
            })

            z.clearCanvas(z.data.cropperData.imageInfo)
        },

        // 原图按钮被点击
        originalChange: function() {
            let that = this
            let imageInfo = that.data.cropperData.imageInfo
            let originalSize = that.data.changableData.originalSize
            let width = originalSize.width
            let height = originalSize.height
            let original = !that.data.cropperData.original

            let compressedScale = original ? 1.0 : 0.4
            let size = cropperUtil.getAdjustSize(W, H, width, height)

            console.log("change original=" + original)

            that.data.cropperData.original = original
            that.data.cropperData.scaleInfo = {
                x: width * compressedScale / size.width,
                y: height * compressedScale / size.height
            }

            // 之所以要设置moveItems，然后延时在设置一次，是因为改变cropperData后，movable-view会莫名其妙移动到左上角
            let moveItemsCopy = that.data.moveItems
            let moveItems = {
                topleft: {
                    x: 0,
                    y: 0
                },
                topright: {
                    x: 0,
                    y: 0
                },
                bottomleft: {
                    x: 0,
                    y: 0
                },
                bottomright: {
                    x: 0,
                    y: 0
                }
            }

            that.setData({
                cropperData: that.data.cropperData,
                moveItems: moveItems
            })

            setTimeout(() => {
                that.setData({
                    moveItems: moveItemsCopy
                })
            }, 100)

            that.drawOriginalImage()
        },

        // 截取选中图片，如果有回调，则调用
        cropImage: function() {
            let z = this
            let cropperData = z.data.cropperData
            let mode = cropperData.mode
            let scaleInfo = cropperData.scaleInfo
            let width = cropperData.width
            let height = cropperData.height

            let moveItems = z.data.moveItems
            // let moveItems = Object.values(z.data.moveItems)

            if (mode == 'rectangle') {
                let maxX = 0,
                    maxY = 0
                for (let key in moveItems) {
                    let item = moveItems[key]

                    maxX = Math.max(item.x, maxX)
                    maxY = Math.max(item.y, maxY)
                }

                let minX = maxX,
                    minY = maxY
                for (let key in moveItems) {
                    let item = moveItems[key]

                    minX = Math.min(item.x, minX)
                    minY = Math.min(item.y, minY)
                }

                let w = maxX - minX,
                    h = maxY - minY
                w *= scaleInfo.x
                h *= scaleInfo.y

                let x = minX * scaleInfo.x,
                    y = minY * scaleInfo.y

                console.log('crop rect: x=' + x + ',y=' + y + ',w=' + w + ',h=' + h)

                wx.showLoading({
                    title: '正在截取...',
                })
                wx.canvasToTempFilePath({
                    x: x,
                    y: y,
                    width: w,
                    height: h,
                    destWidth: w,
                    destHeight: h,
                    canvasId: 'originalCanvas',
                    success: function(res) {
                        let {
                            tempFilePath
                        } = res

                        wx.hideLoading()

                        if (z.data.cropperData.cropCallback) {
                            z.data.cropperData.cropCallback(tempFilePath)
                        }
                    },
                    fail(res) {
                        wx.hideLoading()
                        wx.showModal({
                            title: '截取失败',
                            content: res.errMsg
                        })
                    }
                }, z)
            } else {
                let res = [
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, 0]
                ]
                let points = []
                for (let key in moveItems) {
                    let x = Math.ceil(moveItems[key].x * scaleInfo.x)
                    let y = Math.ceil(moveItems[key].y * scaleInfo.y)


                    let index = 0
                    if (key == 'topleft') {
                        index = 0
                    } else if (key == 'bottomleft') {
                        index = 1
                    } else if (key == 'bottomright') {
                        index = 2
                    } else if (key == 'topright') {
                        index = 3
                    }
                    res[index] = [x, y]

                    points.push({
                        x,
                        y
                    })
                }

                cropperUtil.convexHull(points, points.length)

                if (z.data.cropperData.cropCallback) {
                    z.data.cropperData.cropCallback(res)
                }
            }
        },

        // 测试
        // 截取形状
        changeCropShapeHandler: function() {
            let z = this
            let changableData = z.data.changableData
            if (changableData.shapeEnable) {
                changableData.shapeEnable = false
                z.setData({
                    changableData
                })
                return
            }
            wx.showActionSheet({
                itemList: ['正方形'],
                success: function(res) {
                    let tapIndex = res.tapIndex
                    switch (tapIndex) {
                        case 0:
                            {
                                changableData.shapeEnable = true
                                changableData.shape = {
                                    x: 1.0,
                                    y: 1.0
                                }

                                break;
                            }

                        default:
                            break;
                    }

                    z.setData({
                        changableData
                    })
                    z.setupShape()
                },
                fail: function(res) {
                    console.log(res.errMsg)
                }
            })
        },
        setupShape: function() {
            let z = this
            let changableData = z.data.changableData
            let {
                shape,
                scaleSize
            } = changableData

            let {
                width,
                height
            } = scaleSize

            let rectW = width
            if (width > height) {
                rectW = height
            }
            rectW -= 100

            let moveItems = {
                topleft: {
                    x: (width - rectW) / 2,
                    y: (height - rectW) / 2
                },
                topright: {
                    x: (width - rectW) / 2 + rectW,
                    y: (height - rectW) / 2
                },
                bottomleft: {
                    x: (width - rectW) / 2,
                    y: (height - rectW) / 2 + rectW
                },
                bottomright: {
                    x: (width - rectW) / 2 + rectW,
                    y: (height - rectW) / 2 + rectW
                }
            }

            z.setData({
                moveItems
            })
            z.drawLines(z.data.moveItems, z.data.cropperData.imageInfo, changableData.rotateDegree)
        },

        // 旋转图片
        rotateImage: function() {
            console.log("rotate image")
            let that = this
            let imageInfo = that.data.cropperData.imageInfo
            let width = imageInfo.width
            let height = imageInfo.height
            let rotateDegree = that.data.changableData.rotateDegree

            rotateDegree = rotateDegree == 360 ? 90 : rotateDegree + 90

            // 判断是否为垂直方向
            let isVertical = rotateDegree % 180 > 0
            let rotateWidth = isVertical ? height : width
            let rotateHeight = isVertical ? width : height

            let size = cropperUtil.getAdjustSize(W, H, rotateWidth, rotateHeight)

            // 适应屏幕的位置
            let left = (W - size.width) / 2
            let top = (H - size.height) / 2
            let cropperData = that.data.cropperData

            cropperData.left = left
            cropperData.top = top

            let changableData = that.data.changableData
            changableData.originalSize = {
                width: rotateWidth,
                height: rotateHeight
            }
            changableData.scaleSize = {
                width: size.width,
                height: size.height
            }
            changableData.rotateDegree = rotateDegree

            that.setData({
                changableData: changableData,
                cropperData: cropperData
            })

            console.log(changableData)

            // let moveItemsCopy = that.data.moveItems
            let moveItems = {
                topleft: {
                    x: 0,
                    y: 0
                },
                topright: {
                    x: 0,
                    y: 0
                },
                bottomleft: {
                    x: 0,
                    y: 0
                },
                bottomright: {
                    x: 0,
                    y: 0
                }
            }

            that.setData({
                moveItems: moveItems
            })

            setTimeout(() => {
                that.loadImage(imageInfo.path, rotateWidth, rotateHeight, true)
            }, 100)
        },

        // 根据图片大小设置canvas大小，并绘制图片
        loadImage: function(src, width, height, isRotate) {
            let z = this
            let size = cropperUtil.getAdjustSize(W, H, width, height)

            // 适应屏幕的位置
            let left = (W - size.width) / 2
            let top = (H - size.height) / 2

            // set data
            let updateData = {}
            let cropperData = z.data.cropperData

            cropperData.drawSign = !cropperData.drawSign
            if (!isRotate) {
                cropperData.imageInfo = {
                    path: src,
                    width: width,
                    height: height
                }
            }
            cropperData.left = left
            cropperData.top = top
            cropperData.width = size.width
            cropperData.height = size.height

            let compressedScale = z.data.cropperData.original ? 1.0 : 0.4
            // let scaleSize = cropperUtil.getAdjustSize(W, H, width, height)

            cropperData.scaleInfo = {
                x: width * compressedScale / size.width,
                y: height * compressedScale / size.height
            }

            updateData.cropperData = cropperData

            updateData.moveItems = {
                topleft: {
                    x: 50,
                    y: 50
                },
                topright: {
                    x: size.width - 50,
                    y: 50
                },
                bottomleft: {
                    x: 50,
                    y: size.height - 50
                },
                bottomright: {
                    x: size.width - 50,
                    y: size.height - 50
                }
            }

            let changableData = z.data.changableData
            let rotateDegree = changableData.rotateDegree

            // 判断是否为垂直方向
            let isVertical = rotateDegree % 180 > 0
            let rotateWidth = isVertical ? size.height : size.width
            let rotateHeight = isVertical ? size.width : size.height

            console.log('rotateWidth:' + rotateWidth + ', rotateHeight:' + rotateHeight)

            changableData.previewImageInfo.x = (W - rotateWidth) / 2
            changableData.previewImageInfo.y = (H - rotateHeight) / 2
            changableData.previewImageInfo.w = rotateWidth
            changableData.previewImageInfo.h = rotateHeight

            changableData.originalSize = {
                width: width,
                height: height
            }
            changableData.scaleSize = {
                width: size.width,
                height: size.height
            }

            updateData.changableData = changableData

            z.setData(updateData)

            // console.log("loadImage size:" + width + "*" + height)
            z.drawImage({
                path: z.data.cropperData.imageInfo.path,
                width: width,
                height: height
            })
            // that.drawImage(that.data.cropperData.imageInfo)
            z.drawLines(z.data.moveItems, z.data.cropperData.imageInfo, changableData.rotateDegree)
        },

        // 清空canvas上的数据
        clearCanvas: function(imageInfo) {
            let z = this
            let cropperData = z.data.cropperData
            let size = cropperUtil.getAdjustSize(W, H, imageInfo.width, imageInfo.height)

            if (imageInfo.path != '') {
                let compressedScale = z.data.cropperData.original ? 1.0 : 0.4

                //清空原图
                let ctx = wx.createCanvasContext("originalCanvas", z)
                ctx.clearRect(0, 0, imageInfo.width * compressedScale, imageInfo.height * compressedScale)
                ctx.draw()

                // 清空白线框
                let moveCanvas = wx.createCanvasContext("moveCanvas", z)
                moveCanvas.clearRect(0, 0, size.width, size.height)
                moveCanvas.draw()
            }
        },

        //绘制图片
        drawImage: function(imageInfo) {
            let z = this
            let cropperData = z.data.cropperData
            let size = cropperUtil.getAdjustSize(W, H, imageInfo.width, imageInfo.height)

            if (imageInfo.path != '') {
                let path = imageInfo.path
                let compressedScale = z.data.cropperData.original ? 1.0 : 0.4
                let rotateDegree = z.data.changableData.rotateDegree

                let originalCtx = wx.createCanvasContext('originalCanvas', z)

                //绘制原图
                cropperUtil.drawImageWithDegree(
                    originalCtx,
                    path,
                    imageInfo.width * compressedScale,
                    imageInfo.height * compressedScale,
                    rotateDegree
                )
                console.log("draw=" + path)
            }
        },

        // 单独绘制原图，当切换原图与非原图时使用
        drawOriginalImage: function() {
            let that = this
            let cropperData = that.data.cropperData
            let imageInfo = cropperData.imageInfo
            let originalSize = that.data.changableData.originalSize

            if (imageInfo.path != '') {
                let path = imageInfo.path
                let compressedScale = that.data.cropperData.original ? 1.0 : 0.4
                let rotateDegree = that.data.changableData.rotateDegree

                let originalCtx = wx.createCanvasContext('originalCanvas', this)
                //绘制原图
                cropperUtil.drawImageWithDegree(
                    originalCtx,
                    path,
                    originalSize.width * compressedScale,
                    originalSize.height * compressedScale,
                    rotateDegree
                )
            }
        },

        //绘制选框
        drawLines: function(moveItems, imageInfo, rotateDegree, callback) {
            let that = this
            let isVertical = rotateDegree % 180 > 0
            let cropperData = that.data.cropperData
            let mode = cropperData.mode
            let size
            if (isVertical) {
                size = cropperUtil.getAdjustSize(W, H, imageInfo.height, imageInfo.width)
            } else {
                size = cropperUtil.getAdjustSize(W, H, imageInfo.width, imageInfo.height)
            }

            let convexDots = []
            let orderedDots = Object.values(moveItems)

            // 获取凸边形的点
            convexDots = cropperUtil.convexHull(orderedDots, orderedDots.length)

            // 四个点组成的四边形是不是凸四边形
            let canCrop = convexDots.length == 4
            if (callback) {
                callback(canCrop)
            }

            let ctx = wx.createCanvasContext("moveCanvas", this)

            //绘制高亮选中区域
            let rect = cropperUtil.getCropRect(convexDots)
            // if(rect.w > rect.h) {
            //     rect.h = rect.w
            // }
            // else {
            //     rect.w = rect.h
            // }

            if (mode == 'rectangle') {
                // 绘制半透明遮罩
                ctx.setFillStyle('rgba(0,0,0,0.5)')
                ctx.fillRect(0, 0, size.width, size.height)

                // 清除选中区域的半透明遮罩，使选中区域高亮
                ctx.setFillStyle('rgba(0,0,0,0)')
                ctx.clearRect(rect.x, rect.y, rect.w, rect.h)

                // console.log('rectange')
                // console.log(size)
                // console.log(rect)

                //绘制选中边框
                ctx.setStrokeStyle('white')
                ctx.setLineWidth(2)
                ctx.beginPath()
                ctx.moveTo(rect.x, rect.y)
                ctx.lineTo(rect.x + rect.w, rect.y)
                ctx.lineTo(rect.x + rect.w, rect.y + rect.h)
                ctx.lineTo(rect.x, rect.y + rect.h)
                ctx.lineTo(rect.x, rect.y)

                ctx.stroke()
                ctx.closePath()
            } else {
                //绘制选中边框
                // 如果四个点组成的四边形不是凸四边形，则显示红色，表示不可取
                let color = canCrop ? 'white' : 'red'

                ctx.setStrokeStyle(color)
                ctx.setLineWidth(2)
                ctx.beginPath()
                for (let i = 0, len = convexDots.length; i < len; i++) {
                    let dot = convexDots[i]
                    if (i == 0) {
                        ctx.moveTo(dot.x, dot.y)
                    } else {
                        ctx.lineTo(dot.x, dot.y)
                    }
                }
                let dot = convexDots[0]
                ctx.lineTo(dot.x, dot.y)

                ctx.stroke()
                // 绘制选中区域
                // ctx.setFillStyle('rgba(0,0,0,0.5)')
                // ctx.fillRect(0, 0, size.width, size.height)
                ctx.setFillStyle('rgba(0, 0, 0, 0.3)')
                ctx.fill()
                ctx.closePath()
            }

            //绘制四个角
            let cornerType = mode == 'rectangle' ? 'rect' : 'circle'
            ctx.setFillStyle('white')
            ctx.setStrokeStyle('white')

            // 绘制不同样式的角
            if (cornerType == 'circle') {
                for (let i = 0, len = orderedDots.length; i < len; i++) {
                    let dot = orderedDots[i]

                    ctx.beginPath()
                    ctx.arc(dot.x, dot.y, 10, 0, 2 * Math.PI, true)
                    ctx.fill()
                    ctx.closePath()
                }
            } else if (cornerType == 'rect') {
                let len = 20,
                    w = 3.0,
                    offset = w / 2.0

                ctx.setLineWidth(w)
                ctx.beginPath()

                ctx.moveTo(rect.x - offset, rect.y - offset + len)
                ctx.lineTo(rect.x - offset, rect.y - offset)
                ctx.lineTo(rect.x - offset + len, rect.y - offset)

                ctx.moveTo(rect.x + offset + rect.w - len, rect.y - offset)
                ctx.lineTo(rect.x + offset + rect.w, rect.y - offset)
                ctx.lineTo(rect.x + offset + rect.w, rect.y - offset + len)

                ctx.moveTo(rect.x + offset + rect.w, rect.y + offset + rect.h - len)
                ctx.lineTo(rect.x + offset + rect.w, rect.y + offset + rect.h)
                ctx.lineTo(rect.x + offset + rect.w - len, rect.y + offset + rect.h)

                ctx.moveTo(rect.x - offset, rect.y + offset + rect.h - len)
                ctx.lineTo(rect.x - offset, rect.y + offset + rect.h)
                ctx.lineTo(rect.x - offset + len, rect.y + offset + rect.h)

                ctx.stroke()

                ctx.closePath()
            }

            ctx.draw()
        },

        // move events
        setupMoveItem: function(key, changedTouches, imageInfo, callback) {
            let that = this
            let cropperData = that.data.cropperData
            let moveItems = that.data.moveItems
            let changableData = that.data.changableData
            let left = cropperData.left
            let top = cropperData.top
            let mode = cropperData.mode
            let size = cropperUtil.getAdjustSize(W, H, imageInfo.width, imageInfo.height)

            if (changedTouches.length == 1) {
                let touch = changedTouches[0]
                let x = touch.clientX
                let y = touch.clientY

                // 相对画布的点
                x = x - left
                y = y - top

                moveItems[key].x = x
                moveItems[key].y = y

                // 边界检测，使截图不超出截图区域
                x = x < 0 ? 0 : (x > size.width ? size.width : x)
                y = y < 0 ? 0 : (y > size.height ? size.height : y)
                moveItems[key].x = x
                moveItems[key].y = y

                // 如果是在矩形模式下
                if (mode == 'rectangle') {
                    // 同时设置相连两个点的位置，是相邻的两个点跟随着移动点动，保证选框为矩形
                    if (changableData.shapeEnable) {
                        // let convexDots = []
                        // let orderedDots = Object.values(moveItems)

                        // // 获取凸边形的点
                        // convexDots = cropperUtil.convexHull(orderedDots, orderedDots.length)
                        // //绘制高亮选中区域
                        // let rect = cropperUtil.getCropRect(convexDots)

                        let gapX, gapY
                        let opKey = ''
                        if (key == 'topleft') {
                            opKey = 'bottomright'
                        } else if (key == 'topright') {
                            opKey = 'bottomleft'
                        } else if (key == 'bottomleft') {
                            opKey = 'topright'
                        } else if (key == 'bottomright') {
                            opKey = 'topleft'
                        }

                        gapX = x - moveItems[opKey].x
                        gapY = y - moveItems[opKey].y
                        // gapX = Math.abs(gapX)
                        // gapY = Math.abs(gapY)
                        // console.log(gapX, gapY)
                        // let cx = gapX > 0 ? 1 : -1
                        // let cy = gapY > 0 ? 1 : -1
                        // console.log(cx, cy, gapX, gapY)
                        if (Math.abs(gapX) > Math.abs(gapY)) {
                            if (key == 'topleft' || key == 'bottomright') {
                                moveItems[key].x = moveItems[opKey].x + gapY
                                moveItems[key].y = moveItems[opKey].y + gapY
                            } else {
                                moveItems[key].x = moveItems[opKey].x - gapY
                                moveItems[key].y = moveItems[opKey].y + gapY
                            }
                        } else {
                            if (key == 'topleft' || key == 'bottomright') {
                                moveItems[key].x = moveItems[opKey].x + gapX
                                moveItems[key].y = moveItems[opKey].y + gapX
                            } else {
                                moveItems[key].x = moveItems[opKey].x + gapX
                                moveItems[key].y = moveItems[opKey].y - gapX
                            }
                        }
                    }
                    if (key == 'topleft') {
                        moveItems['bottomleft'].x = moveItems[key].x
                        moveItems['topright'].y = moveItems[key].y
                    } else if (key == 'topright') {
                        moveItems['bottomright'].x = moveItems[key].x
                        moveItems['topleft'].y = moveItems[key].y
                    } else if (key == 'bottomleft') {
                        moveItems['topleft'].x = moveItems[key].x
                        moveItems['bottomright'].y = moveItems[key].y
                    } else if (key == 'bottomright') {
                        moveItems['topright'].x = moveItems[key].x
                        moveItems['bottomleft'].y = moveItems[key].y
                    }
                }

                that.drawLines(moveItems, imageInfo, changableData.rotateDegree, function(canCrop) {
                    if (callback) {
                        callback(moveItems, canCrop)
                    }
                })
            }
        },

        // moveable-view touchmove
        moveEvent: function(e) {
            let z = this
            let key = e.currentTarget.dataset.key
            let originalSize = z.data.changableData.originalSize

            z.setupMoveItem(key, e.changedTouches, {
                path: z.data.cropperData.imageInfo.path,
                width: originalSize.width,
                height: originalSize.height
            })
        },

        // moveable-view touchend，end的时候设置movable-view的位置，如果在move阶段设置位置，选中会不流畅
        endEvent: function(e) {
            let z = this
            let {
                cropperData,
                moveItems,
                changableData
            } = z.data
            let originalSize = changableData.originalSize
            let key = e.currentTarget.dataset.key

            z.setupMoveItem(key, e.changedTouches, {
                path: z.data.cropperData.imageInfo.path,
                width: originalSize.width,
                height: originalSize.height
            }, (moveItems, canCrop) => {
                changableData.canCrop = canCrop
                z.setData({
                    changableData: changableData,
                    moveItems: moveItems
                })
            })
        }
    }
})