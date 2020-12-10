class Bannbox {

    constructor(ele) {

        this.ele = document.querySelector(ele)
        this.img_box = this.ele.querySelector('.nav-centent-imgBox')
        this.point_box = this.ele.querySelector('.nav-centent-pointbox')
        this.right_left = this.ele.querySelector('.nav-centent-lr')
        this.box_width = this.ele.clientWidth

        this.index = 1
        this.flag = true
        this.timer = 0
        this.insit()
    }

    insit() {
        this.getFocus()
        this.imgClone()
        this.autoPlay()
        this.mouseMove()
        this.rightAndleft()
        this.pointClick()
        this.winChange()
    }

    // 获取焦点

    getFocus() {

        const frg = document.createDocumentFragment()
        const imgNum = this.img_box.children.length

        for (let i = 0; i < imgNum; i++) {
            const li = document.createElement('li')
            li.setAttribute('point_index', i)

            if (i === 0) li.classList.add('active')
            frg.appendChild(li)
        }

        this.point_box.style.width = imgNum * (10 + 6) + 'px'
        this.point_box.appendChild(frg)
    }

    // 复制首尾轮播图
    imgClone() {

        const first = this.img_box.children[this.img_box.children.length - 1].cloneNode(true)
        const last = this.img_box.children[0].cloneNode(true)
        this.img_box.appendChild(last)
        this.img_box.insertBefore(first, this.img_box.children[0])
        this.img_box.style.width = this.img_box.children.length * 100 + '%'
        this.img_box.style.left = -this.index * this.box_width + 'px'
    }

    // 自动轮播
    autoPlay() {
        this.timer = setInterval(() => {
            this.flag = false

            this.index++
                move(this.img_box, { left: -this.index * this.box_width }, this.moveEnd.bind(this))
            this.pointChange()
        }, 2000)
    }

    // 运动结束
    moveEnd() {

        if (this.index == this.img_box.children.length - 1) {
            this.index = 1
            this.img_box.style.left = -this.index * this.box_width + 'px'
        }

        if (this.index == 0) {
            this.index = this.img_box.children.length - 2
            this.img_box.style.left = -this.index * this.box_width + 'px'
        }


        // for(let i = 0; i < this.point_box.children.length; i++){
        //     this.point_box.children[i].classList.remove('active')
        // }
        // this.point_box.children[this.index - 1].classList.add('active')
        this.flag = true
    }

    // 焦点变化
    pointChange() {

        for (let i = 0; i < this.point_box.children.length; i++) {
            this.point_box.children[i].classList.remove('active')
        }

        if (this.index === this.img_box.children.length - 1) this.point_box.children[0].classList.add('active')
        if (this.index <= 0) this.point_box.children[this.point_box.children.length - 1].classList.add('active')
        if (this.index >= 1 && this.index <= this.point_box.children.length) this.point_box.children[this.index - 1].classList.add('active')
    }

    // 鼠标划入停止
    mouseMove() {

        this.ele.addEventListener('mouseover', () => {
            clearInterval(this.timer)
        })

        this.ele.addEventListener('mouseout', () => {
            this.autoPlay()
        })
    }

    // 左右切换
    rightAndleft() {

        this.right_left.addEventListener('click', (e) => {
            // event.stopPropagation
            e = e || window.event
            const target = e.target || e.srcElement

            if (target.className == 'nav-centent-l') {
                if (!this.flag) return
                this.flag = false
                this.index--
                    move(this.img_box, { left: -this.index * this.box_width }, this.moveEnd.bind(this))
                this.pointChange()
            }

            if (target.className == 'nav-centent-r') {
                if (!this.flag) return
                this.flag = false
                this.index++
                    move(this.img_box, { left: -this.index * this.box_width }, this.moveEnd.bind(this))
                this.pointChange()
            }

        })
    }

    // 焦点切换
    pointClick() {

        this.point_box.addEventListener('click', (e) => {

            e = e || window.event
            const target = e.target || e.srcElement
            if (!this.flag) return
            this.flag = false
            if (target.nodeName == 'LI') {
                const point_index = target.getAttribute('point_index') - 0
                this.index = point_index + 1
            }

            move(this.img_box, { left: -this.index * this.box_width }, this.moveEnd.bind(this))
            this.pointChange()

        })
    }

    // 页面切换bug
    winChange() {

        document.addEventListener('visibilitychange', () => {
            const state = document.visibilityState

            if (state == 'hidden') {
                clearInterval(this.timer)
            }
            if (state == 'visible') {
                this.autoPlay()
            }
        })
    }
}