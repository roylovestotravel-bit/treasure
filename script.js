const products = [
    {id:1, name:"手工燕麦皂", desc:"温和天然配方,敏感肌可用", price:38, tag:"新品", img:"#d7c9a8"},
    {id:2, name:"陶瓷香薰炉", desc:"手工拉坯,哑光釉面", price:126, tag:"热卖", img:"#c4bfa8"},
    {id:3, name:"亚麻餐垫 一对", desc:"日式侘寂风格,原色亚麻", price:68, tag:"", img:"#b7ae91"},
    {id:4, name:"木质晾晒架", desc:"胡桃木,可折叠收纳", price:158, tag:"", img:"#a89a7d"},
    {id:5, name:"手冲咖啡滤杯", desc:"陶瓷材质,V60同款", price:88, tag:"新品", img:"#cdd6bd"},
    {id:6, name:"棉麻收纳篮", desc:"手工编织,可叠放", price:56, tag:"", img:"#ded6c0"},
  ];

  let cart = {}; // { id: qty }

  function renderProducts(){
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => `
      <div class="product">
        <div class="product-img" style="--img:${p.img}">
          ${p.tag ? `<div class="product-tag">${p.tag}</div>` : ''}
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <div class="desc">${p.desc}</div>
          <div class="product-footer">
            <span class="price">¥${p.price}</span>
            <button class="add-btn" onclick="addToCart(${p.id})">加入购物车</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function addToCart(id){
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
    toggleDrawer(true);
  }

  function changeQty(id, delta){
    cart[id] = (cart[id] || 0) + delta;
    if(cart[id] <= 0) delete cart[id];
    renderCart();
  }

  function renderCart(){
    const items = Object.entries(cart);
    const countEl = document.getElementById('cartCount');
    const itemsEl = document.getElementById('drawerItems');
    const totalEl = document.getElementById('totalPrice');

    const totalCount = items.reduce((sum,[,q]) => sum+q, 0);
    countEl.textContent = totalCount;

    if(items.length === 0){
      itemsEl.innerHTML = `<div class="empty-cart">购物车还是空的,去挑几件喜欢的吧</div>`;
      totalEl.textContent = '¥0';
      return;
    }

    let total = 0;
    itemsEl.innerHTML = items.map(([id, qty]) => {
      const p = products.find(x => x.id == id);
      total += p.price * qty;
      return `
        <div class="cart-item">
          <span>${p.name}</span>
          <div class="qty-ctrl">
            <button onclick="changeQty(${id}, -1)">−</button>
            <span>${qty}</span>
            <button onclick="changeQty(${id}, 1)">+</button>
          </div>
          <span>¥${p.price * qty}</span>
        </div>
      `;
    }).join('');
    totalEl.textContent = `¥${total}`;
  }

  function toggleDrawer(open){
    document.getElementById('drawer').classList.toggle('open', open);
    document.getElementById('overlay').classList.toggle('open', open);
  }

  function checkout(){
    if(Object.keys(cart).length === 0){
      alert('购物车是空的哦~');
      return;
    }
    alert('这是演示效果 🎉\n真正上线时,这里会跳转到支付宝/微信支付完成付款。');
  }

  renderProducts();