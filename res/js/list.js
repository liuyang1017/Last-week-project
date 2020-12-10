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



/*
  列表页业务逻辑
    1. 确定哪些内容不属于前端
      => 一级分类
      => 二级分类
      => 三级分类
      => 分页信息
      => 商品列表
      => 肯定需要请求渲染
    2. 确定页面主体
      => 页面的主要内容是: 商品列表
      => 因为你的分类信息, 决定商品列表展示哪些内容
      => 因为你的分页信息, 决定商品列表展示哪些内容
    3. 书写的顺序
      3-1. 确定一个对象结构数据类型
        => { 书写所有能影响列表数据的信息 }
        => 将来请求的列表数据, 根据这个对象信息里面的数据进行请求
      3-2. 确定所有可以修改对象信息的操作
        => 点击一级分类
        => 点击二级分类
        => 点击三级分类
        => 点击排序方式
        => 点击第几页
      3-3. 使用这个对象去请求列表数据
        => 渲染页面
*/

/*
  代码逻辑
  (1-3步骤 就是请求回来，然后渲染)
  1. 请求一级分类列表
    => 渲染一级分类列表位置标签结构
  2. 请求总页数
    => 利用 jquery-pagination 渲染分页结构
  3. 渲染商品列表
    => 需要携带整个 list_info 过去到后端
    => 拿到数据
    => 渲染列表页面
  4. 点击一级分类进行切换操作
    4-1. 需要给谁绑定事件 ?
      -> 给 cateOneBox 绑定事件, 事件委托的形式
    4-2. 切换类名
      -> 自己加上 active, 所有兄弟去掉 active
    4-3. 确定点击的是哪一个
      -> 拿到点击的这个 span 身上的 data-type 自定义属性
    4-4. 把 list_info 里面对应的信息修改掉
      -> 从新请求分类信息数据, 只要执行一遍 getTotalPage()
      -> 从新请求商品列表数据, 只要执行一遍 getGoodsList()
    4-5. 需要根据 type 得到的信息
      -> 决定是否请求二级分类列表
    4-6. 切换二级分类到 ALL
      -> 只要一级分类进行切换
      -> 二级分类都应该开始默认在 all 的位置
  5. 点击二级分类进行切换操作
    5-1. 需要给谁绑定事件 ?
      -> 给 cateTwoBox 绑定事件, 事件委托的形式
    5-2. 切换类名
      -> 自己加上 active, 所有兄弟去掉 active
    5-3. 确定点击的是哪一个
      -> 拿到点击的这个 span 身上的 data-type 属性
    5-4. 把 list_info 里面对应的信息修改掉
      -> 从新请求分类信息数据, 只要执行一遍 getTotalPage()
      -> 从新请求商品列表数据, 只要执行一遍 getGoodsList()
    5-5. 根据当前的 type 信息决定是否请求三级分类列表
      ->
    5-6. 只要二级分类切换, 就应该切换三级分类信息
      -> 需要把三级分类切换成 all
  6. 三级分类的事件
    6-1. 事件委托
    6-2. 切换类名
    6-3. 修改 listInfo 的信息
    6-4. 重新请求
  7. 排序方式的变化
    7-1. 事件委托
    7-2. 拿到点击元素身上的 data-method 和 data-type
    7-3. 切换类名
    7-4. 修改对象内的内容
    7-5. 从新请求
    7-6. 把我的 data-type 修改为 DESC 或者 ASC
      -> 如果当前是 ASC 修改为 DESC
      -> 如果当前是 DESC 修改为 ASC
  8. 分页切换
    + 因为分页使用的是 jquery-pagination
    + 他里面有回调函数
    + 直接使用它的回调函数
    + 只要在回调函数里面, 把current 数据修改了
    + 就可以了
    + 注意: 各级分类改变的时候, 都把 cuurent 回归到 1

  9. 点击跳转到详情页面
    + 点击每一个商品下面的 h3 标签的时候
    + 拿到记录在标签身上的 id
    + 存储到 cookie 里面
    + 切换到 detail 页面
*/

// 入口函数
$(function() {

    // 0. 准备一个变量, 接受所有的商品信息
    let list = null

    // 0. 准备一个对象, 记录所有可以影响页面主体内容的数据
    const list_info = {
        cat_one: 'all',
        cat_two: 'all',
        cat_three: 'all',
        sort_method: '综合',
        sort_type: 'ASC',
        current: 1,
        pagesize: 10
    }

    // 1. 请求一级分类列表
    getCateOne()
    async function getCateOne() {
        // 1-2. 发送请求获取
        const cat_one_list = await $.get('../server/getCateOne.php', null, null, 'json')
            // console.log(cat_one_list)

        // 1-3. 进行列表渲染
        let str = `<span data-type="all" class="active">全部</span>`

        cat_one_list.list.forEach(item => {
            str += `
          <span href="" data-type="${ item.cat_one_id }">${ item.cat_one_id }</span>
        `
        })

        $('.centent-nav1 > li').html(str)
    }
    // 1-2. 请求二级分类列表
    async function getCateTwo() {
        // 1. 请求二级分类列表数据
        const cate_two_list = await $.get('../server/getCateTwo.php', { cat_one: list_info.cat_one }, null, 'json')
            // console.log(cate_two_list)

        // 2. 根据二级列表数据渲染页面
        let str = '<span data-type="all" class="active">全部</span>'
        cate_two_list.list.forEach(item => {
            str += `<span data-type="${ item.cat_two_id }">${ item.cat_two_id }</span>`
        })
        $('.centent-nav2 > li').html(str)

    }

    // 1-3. 请求三级分类列表
    async function getCateThree() {
        // 1. 请求二级分类列表数据
        const cate_three_list = await $.get('../server/getCateThree.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two }, null, 'json')
            // console.log(cate_three_list)

        // 2. 根据二级列表数据渲染页面
        let str = '<span data-type="all" class="active">全部</span>'
        cate_three_list.list.forEach(item => {
            str += `<span data-type="${ item.cat_three_id }">${ item.cat_three_id }</span>`
        })
        $('.centent-nav3 > li').html(str)
    }

    // 2. 请求总页数, 回来渲染分页器
    getTotalPage()
    async function getTotalPage() {
        // 2-1. 请求分页数据
        const totalInfo = await $.get('../server/getTotalPage.php', list_info, null, 'json')

        // 2-2. 渲染分页内容
        // jquery-pagination 插件
        $('.mbox3').pagination({
            pageCount: totalInfo.total,
            callback(index) {
                list_info.current = index.getCurrent()
                    // 从新请求商品列表
                $('.mbox3').pagination({
                    jump: true,
                    coping: true,
                    homePage: '首页',
                    endPage: '末页',
                    prevContent: '上页',
                    nextContent: '下页',
                });
                getGoodsList()
            }
        })
    }

    // 3. 请求商品列表数据
    getGoodsList()
    async function getGoodsList() {
        // 3-1. 请求商品列表
        const goodsList = await $.get('../server/getGoodsList.php', list_info, null, 'json')
        console.log(goodsList)
            // 给全局变量 list 进行赋值
        list = goodsList.list
        console.log(list)
            // 3-2. 渲染页面
        let str = ''
        goodsList.list.forEach(item => {
            str += `
              <div>
                <p class="box-id" data-id="${ item.goods_id }">
                    <img src="${ item.goods_big_logo }" alt="">
                </p>
                <h6>
                    ${ item.goods_name }
                </h6>
                <b>￥${ item.goods_price }</b>
                <h5>
                    <span class="btn btn-danger addCart" role="button" data-id="${ item.goods_id }" >加入购物车</span>
                    <a class="btn btn-warning" role="button"  href="../pages/cart.html">结算</a>
                </h5>
              </div>
            `
        })
        $('.centent-list').html(str)
    }

    // // 4. 一级分类的点击事件
    // // 4-1. 事件委托的形式进行事件绑定
    $('.centent-nav1').on('click', 'span', function() {
        // 4-2. 操作类名
        $(this).addClass('active').siblings().removeClass('active')

        // 4-3. 拿到你点击的是哪一个
        const type = $(this).data('type')

        // 4-6. 只要一级分类进行切换, 修改二级分类为 all
        // 4-6. 只要一级分类进行切换, 修改三级分类为 all
        list_info.cat_two = 'all'
        list_info.cat_three = 'all'
            // 让当前页回到第一页
        list_info.current = 1

        // 4-4. 修改 list_info
        list_info.cat_one = type
            // 从新渲染分类信息和列表数据
        getTotalPage()
        getGoodsList()
            // $('.catThreeBox .right').html('<span data-type="all" class="active">全部</span>')

        // 4-5. 判断 type 是否为 all 信息
        if (type === '全部') {
            // 让二级列表回到 全部 状态
            // 改变结构
            $('.centent-nav2 > li').html('<span data-type="all" class="active">全部</span>')
        } else {
            // 根据一级分类 请求 二级分类列表 渲染
            getCateTwo()
        }
    })

    // 5. 二级分类的点击事件
    // 5-1. 事件委托的形式进行事件绑定
    $('.centent-nav2').on('click', 'span', function() {
        // 5-2. 拿到 type 属性
        const type = $(this).data('type')

        // 5-3. 切换类名
        $(this).addClass('active').siblings().removeClass('active')

        // 5-6. 切换三级分类
        list_info.cat_three = 'all'
            // 让当前页回到第一页
        list_info.current = 1

        // 5-4. 修改对象信息
        list_info.cat_two = type
            //     // 从新渲染分类信息和列表数据
        getTotalPage()
        getGoodsList()

        // 5-5. 根据 type 属性决定是否请求三级分类
        if (type === 'all') {
            // 让二级列表回到 全部 状态
            // 改变结构
            $('.centent-nav3 > li').html('<span data-type="all" class="active">全部</span>')
        } else {
            // 根据二级分类 请求 三级分类列表 渲染
            getCateThree()
        }
    })

    // 6. 三级分类的点击事件
    // 6 - 1. 事件委托
    $('.centent-nav3').on('click', 'span', function() {
        const type = $(this).data('type')
            // console.log(151)

        $(this).addClass('active').siblings().removeClass('active')

        list_info.cat_three = type
            // 让当前页回到第一页
        list_info.current = 1
        getTotalPage()
        getGoodsList()
    })

    // // 7. 排序方式的点击事件
    // $('.sortBox').on('click', 'span', function() {
    //     // 7-2. 拿到信息
    //     const method = $(this).attr('data-method')
    //     const type = $(this).attr('data-type')

    //     // 7-3. 切换类名
    //     $(this).addClass('active').siblings().removeClass('active')

    //     // 7-4. 修改对象信息
    //     list_info.sort_method = method
    //     list_info.sort_type = type

    //     // 7-5. 从新请求
    //     getTotalPage()
    //     getGoodsList()

    //     // 7-6. 修改 data-type 属性
    //     // 为下一次准备的
    //     $(this)
    //         .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
    //         .siblings()
    //         .attr('data-type', 'ASC')
    // })

    // // 9. 点击跳转到详情页

    $('.centent-list').on('click', 'p', function() {
        // 9-2. 拿到 标签身上记录的商品 id
        const id = $(this).data('id')
            // console.log(id)
            // 9-3. 把这个 id 存储到 cookie 中
        setCookie('goods_id', id)
            // 9-4. 进行页面跳转
        window.location.href = '../pages/detail.html'
    })

    // // 10. 加入购物车的操作
    $('.goodsList').on('click', '.addCart', function() {
        // 4-2. 拿到 localStorage 里面有没有数组
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []

        // 多一个拿到 id 的操作
        const id = $(this).data('id')

        // 4-3. 判断一下 cart 数组里面有没有这个数据
        const flag = cart.some(item => item.goods_id == id)
        if (flag) {
            // 4-4. 如果有这个数据拿到这个信息
            const cart_goods = cart.filter(item => item.goods_id == id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + 1
        } else {
            // 拿到当前商品 id 所属的信息
            const info = list.filter(item => item.goods_id == id)[0]
            info.cart_number = 1
            cart.push(info)
        }

        // 4-5. 添加完毕还要存储到 localStorage 里面
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })

})