import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import requester from '../../helpers/requester';
import './styles/HomepageCategoryPreview.css';

function HomepageCategoryPreview() {
  const [categories, setCategories] = useState([]);

  const requestAllCategories = async () => {
    const response = await requester('categories', 'get');
    const slicingCategories = response.slice(0, 4);

    setCategories(slicingCategories);
  };

  const handleShopClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    requestAllCategories();
  }, []);

  return (
    <section className="homepage-category-preview">
      <div className="preview-header">
        <h2>Comprar por categoria</h2>
        <button
          type="button"
          onClick={handleShopClick}
        >
          Loja
        </button>
      </div>
      <div className="preview-categories">
        {categories && categories.map((cat) => {
          const { name, thumbnail } = cat;
          return (
            <a href={`/category/${cat._id}`} className="category-showed" key={uuid()}>
              <div className="image-div" style={{ backgroundImage: `url(${thumbnail})` }} />
              <span>{name}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default HomepageCategoryPreview;
