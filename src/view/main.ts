// src/views/main.ts
import { getProducts,addProduct,removeProduct,editProduct } from '../controller/ProductController';
import { Product } from '../model/product';

const productForm = document.getElementById('product-form') as HTMLFormElement;
const productList = document.getElementById('product-list') as HTMLDivElement;

const loadProducts = async () => {
  const products = await getProducts();
  renderProducts(products);
};

const renderProducts = (products: Product[]) => {
  productList.innerHTML = ''; // Clear existing content
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = product.images || '';
    img.alt = product.title;

    const title = document.createElement('h2');
    title.textContent = product.title;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;
    price.className = 'price';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.dataset.id = product.id.toString();

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.dataset.id = product.id.toString();

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(editButton);
    card.appendChild(deleteButton);

    productList.appendChild(card);
  });
};

const handleFormSubmit = async (event: Event) => {
  event.preventDefault();
  const id = (document.getElementById('product-id') as HTMLInputElement).value;
  const title = (document.getElementById('product-title') as HTMLInputElement).value;
  const price = parseFloat((document.getElementById('product-price') as HTMLInputElement).value);
  const description = (document.getElementById('product-description') as HTMLInputElement).value;
  const category = (document.getElementById('product-category') as HTMLInputElement).value;
  const images = (document.getElementById('product-image') as HTMLInputElement).value;

  if (id) {
    await editProduct({ id: parseInt(id), title, price, description, category, images });
  } else {
    await addProduct({ title, price, description, category, images });
  }

  productForm.reset();
  loadProducts();
};

const handleProductAction = async (event: Event) => {
  const target = event.target as HTMLButtonElement;
  const id = target.dataset.id;

  if (target.classList.contains('edit')) {
    const product = (await getProducts()).find(p => p.id === parseInt(id!));
    if (product) {
      (document.getElementById('product-id') as HTMLInputElement).value = product.id.toString();
      (document.getElementById('product-title') as HTMLInputElement).value = product.title;
      (document.getElementById('product-price') as HTMLInputElement).value = product.price.toString();
      (document.getElementById('product-description') as HTMLInputElement).value = product.description;
      (document.getElementById('product-category') as HTMLInputElement).value = product.category;
      (document.getElementById('product-image') as HTMLInputElement).value = product.images;
    }
  }

  if (target.classList.contains('delete')) {
    await removeProduct(parseInt(id!));
    loadProducts();
  }
};

productForm.addEventListener('submit', handleFormSubmit);
productList.addEventListener('click', handleProductAction);
window.addEventListener('DOMContentLoaded', loadProducts);