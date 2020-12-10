class Banner {
    constructor(ele) {
            this.ele = document.querySelector(ele)
            this.imgBox = this.ele.querySelector('.nav-box-imgbox')
            this.pointbox = this.ele.querySelector('.nav-box-pointbox')
            this.leftRightBox = this.ele.querySelector('.nav-box-lr')
            this.index = 0
            this.time = 0
            this.init()
        }
        // 入口函数
    init() {
        this.aa()
        this.move()
        this.cc()
        this.dd()
        this.ee()
    }

    // 设置焦点
    aa() {
        const Num = this.imgBox.children.length
        const frg = document.createDocumentFragment()
        for (let i = 0; i < Num; i++) {
            const li = document.createElement('li')
            if (i === 0) li.className = 'active'
            li.setAttribute('i', i)
            li.innerText = i + 1
            frg.appendChild(li)
        }
        this.pointbox.appendChild(frg)
        this.pointbox.style.width = Num * 20 * 1.3 + 'px'
    }

    // 切换一张

    bb(type) {
        this.imgBox.children[this.index].classList.remove('active')
        this.pointbox.children[this.index].classList.remove('active')
        if (type === true) {
            this.index++
        } else if (type === false) {
            this.index--
        } else {
            this.index = type
        }
        if (this.index >= this.imgBox.children.length) this.index = 0
        if (this.index < 0) this.index = this.imgBox.children.length - 1
        this.imgBox.children[this.index].classList.add('active')
        this.pointbox.children[this.index].classList.add('active')
    }
    move() {
        this.timer = setInterval(() => {
            this.bb(true)
        }, 2500)
    }
    cc() {
        this.ele.addEventListener('mouseover', () => clearInterval(this.timer))
        this.ele.addEventListener('mouseout', () => this.move())
    }
    dd() {
        this.leftRightBox.addEventListener('click', e => {
            e = e || window.event
            const target = e.target || e.srcElement

            if (target.className === 'nav-box-l') {
                this.bb(false)
            }
            if (target.className === 'nav-box-r') {
                this.bb(true)
            }
        })
    }
    ee() {
        this.pointbox.addEventListener('mouseover', e => {
            e = e || window.event
            const target = e.target || e.srcElement

            if (target.nodeName === 'LI') {
                const i = target.getAttribute('i') - 0
                this.bb(i)
            }
        })
    }
}

// 轮播图
class Bannboxhight {
    constructor(ele) {
            this.ele = document.querySelector(ele)
            this.imgBox = this.ele.querySelector('.seckill-r-b')
            this.pointbox = this.ele.querySelector('.seckill-point')
            this.leftRightBox = this.ele.querySelector('.seckill-point')
            this.index = 0
            this.time = 0
            this.init()
        }
        // 入口函数
    init() {
        this.aa()
        this.move()
        this.dd()
    }
    aa() {
        const Num = this.imgBox.children.length
        const frg = document.createDocumentFragment()
        for (let i = 0; i < Num; i++) {
            const li = document.createElement('li')
            if (i === 0) li.className = 'active'
            li.setAttribute('i', i)
            frg.appendChild(li)
        }
        this.pointbox.appendChild(frg)
        this.pointbox.style.width = Num * 10 + 'px'
    }
    bb(type) {
        this.imgBox.children[this.index].classList.remove('active')
        this.pointbox.children[this.index].classList.remove('active')

        if (type === true) {
            this.index++
        } else if (type === false) {
            this.index--
        } else {
            this.index = type
        }

        if (this.index >= this.imgBox.children.length) this.index = 0
        if (this.index < 0) this.index = this.imgBox.children.length - 1

        this.imgBox.children[this.index].classList.add('active')
        this.pointbox.children[this.index].classList.add('active')
    }
    move() {
        this.timer = setInterval(() => {
            this.bb(true)
        }, 3000)
    }
    dd() {
        this.pointbox.addEventListener('click', e => {
            e = e || window.event
            const target = e.target || e.srcElement

            if (target.nodeName === 'LI') {
                const i = target.getAttribute('i') - 0
                this.bb(i)
            }
        })
    }
}


if (getCookie('nickname') != "") {
    $('.header-middle>span').html('你好,' + getCookie('nickname'))
}
if (getCookie('nickname') == undefined) {
    $('.header-middle>span').html(
        `欢迎光临当当，请 
        <a href="../pages/go.html"><mark>登录</mark></a>&nbsp;
        <a href="">成为会员</a>`
    )
}

$('nav-centent-left').eq()
$('nav-centent-left > li').click(function() {
    // 自己是什么 this
    // console.log(this)
    // 自己添加类名, 所有兄弟元素取消类名
    // 因为 this 不是 jQuery 的元素集合, 是一个 DOM 元素
    // 在外面包裹一个 $() 就可以了
    // 就能把 DOM 元素转化成 jQuery 的元素集合
    // $(this).addClass('active').siblings().removeClass('active')

    // ol 下面所有 li 取消类名
    // index() 专门获取索引
    // console.log($(this).index())
    // $('ol > li').removeClass('active').eq($(this).index()).addClass('active')

    $(this) // 点击的 li
        .addClass('active')
        .siblings() // ul 下面的所有 li
        .removeClass('active')
        .parent() // ul
        .next() // ol
        .find('li') // ol 下面所有的 li
        .removeClass('active')
        .eq($(this).index()) // 索引配套的那个 li
        .addClass('active')
})

$(function() {

    let list = null

    // 0. 准备一个对象, 记录所有可以影响页面主体内容的数据
    const list_info = {
        current: 1,
        pagesize: 10
    }


    getCateOne()
    async function getCateOne() {
        // 1-2. 发送请求获取
        const cat_one_list = await $.get('../server/getCateOne.php', null, null, 'json')
            // console.log(cat_one_list)

        // 1-3. 进行列表渲染

        cat_one_list.list.forEach(item => {
            str += `
            <div>
                <p class="box-id" data-id="${ item.goods_id }">
                    <img src="${ item.goods_big_logo }" alt="">
                </p>
                <h6>
                    ${ item.goods_name }
                </h6>
                <b>￥${ item.goods_price }</b>
              </div>
            `
        })
        $('.recommend-box').html(str)
    }

    // // 9. 点击跳转到详情页

    $('.recommend-box').on('click', 'p', function() {
        // 9-2. 拿到 标签身上记录的商品 id
        const id = $(this).data('id')
            // console.log(id)
            // 9-3. 把这个 id 存储到 cookie 中
        setCookie('goods_id', id)
            // 9-4. 进行页面跳转
        window.location.href = '../pages/detail.html'
    })






})