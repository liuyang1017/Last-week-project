// 请求单一一条商品的所有信息, 按照 html 格式渲染

// 问题: 请求哪一条商品的信息 ?
//   + 在列表页点击哪一个 商品, 就是哪一个商品的信息
//   + 点击事件发生在 list.html 页面, 请求商品详情信息发生在 detail.html 页面
//   + 点击商品的时候, 把商品 id 存储在 cookie 里面
//   + 在详情页拿到商品 id, 根据 id 去请求这一条商品

// 问题: 如何跨页面进行通讯 ?
//   + 登录的时候, 在 login.html 得到的用户昵称信息
//   + 使用的时候, 在 index.html 使用的用户昵称信息

// 加入购物车的事件
//   + 只要我组装出一个数组来
//   + 存储到 lcoalStorage 里面
//   + 将来在 cart.html 页面把这个数组拿出来

// 4. 当你点击 加入购物车的时候
//   + 向数组里面组装的过程
//   4-1. 事件绑定给谁 ?
//     => 因为 addCart 是渲染的, 所以绑定给 goodsInfo 进行事件委托
//   4-2. 拿到 localStorage 里面有没有购物车数组
//   4-3. 确定数组中有没有这个数据
//     => 当我两次加入同一个数据的时候, 要判断一下原先有没有这个数据
//   4-4. 将数据再次存储到 localStorage 中

// 5. 操作 加 减 按钮, 让 input 里面的数字 ++ 或者 --
//   5-1. 事件委托, 委托给 goodsInfo




// jQuery 的入口函数
$(function() {

    let info = null

    // 提前准备一个变量拿出来商品信息
    const id = getCookie('goods_id')
        // console.log(id)

    getGoodsInfo()
    async function getGoodsInfo() {
        const goodsInfo = await $.get('../server/getGoodsInfo.php', { goods_id: id }, null, 'json')
            // console.log(goodsInfo)

        // 进行页面的渲染
        bindHtml(goodsInfo.info)

        // 给提前准备好的变量进行赋值
        info = goodsInfo.info
    }

    function bindHtml(info) {
        // console.log(info)

        // 渲染左边放大镜位置
        $('.enlargeBox').html(`
        <div class="show">
            <img src="${ info.goods_big_logo }" alt="">
        </div>
        <div class="list">
            <p class="active">
                <img src="${ info.goods_small_logo }" alt="">
            </p>
        </div>
        `)


        // 商品详细信息渲染
        $('.goodsInfo').html(`
                <p class="desc">${ info.goods_name }</p>
        <div class="btn-group size">
            <button type="button" class="btn btn-default">S</button>
            <button type="button" class="btn btn-default">M</button>
            <button type="button" class="btn btn-default">L</button>
            <button type="button" class="btn btn-default">XL</button>
        </div>
        <p class="price">
            ￥ <span class="text-danger">${ info.goods_price }</span>
        </p>
        <div class="num">
            <button class="subNum">-</button>
            <input type="text" value="1" class="cartNum">
            <button class="addNum">+</button>
        </div>
        <div>
            <button class="btn btn-success addCart">加入购物车</button>
            <button class="btn btn-warning continue"><a href="../pages/list.html">继续去购物</a></button>
            <button class="btn btm-three" ><a href="../pages/cart.html">结算</a></button>
        </div>
            `)

        // 商品参数渲染
        $('.goodsDesc').html(info.goods_introduce)
    }


    // // 加入购物车的操作
    $('.goodsInfo').on('click', '.addCart', function() {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []
        console.log(cart)

        // // const flag = cart.some(item => {
        // //     return item.goods_id === id
        // // })
        // // 简写
        const flag = cart.some(item => item.goods_id === id)

        if (flag) {

            const cart_goods = cart.filter(item => item.goods_id === id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)

        } else {

            info.cart_number = 1

            // 表示没有
            cart.push(info)
        }

        // 添加完毕还要存储到 localStorage 里面
        window.localStorage.setItem('cart', JSON.stringify(cart))

    })



    // ++ -- 的事件
    $('.goodsInfo')
        .on('click', '.subNum', function() {
            // console.log(11)
            // 拿到 input 的 value 值
            let num = $('.cartNum').val() - 0

            // 进行判断, 如果当前是 1, 那么什么都不做
            if (num === 1) return

            // 否则就进行 -- 操作, 然后在设置回去
            $('.cartNum').val(num - 1)
        })
        .on('click', '.addNum', function() {
            // console.log(22)

            // 拿到 input 的 value 值
            let num = $('.cartNum').val() - 0

            // 否则就进行 ++ 操作, 然后在设置回去
            $('.cartNum').val(num + 1)
        })

})


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