
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient.js";
import "./App.css";

const categories = ["All", "Tops", "Bottoms", "Dresses", "Shoes", "Bags"];

const products = [
  {
    id: 1,
    name: "Soft Knit Cardigan",
    category: "Tops",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=85",
    label: "MOST LOVED",
  },
  {
    id: 2,
    name: "Classic Straight Denim",
    category: "Bottoms",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",
    label: "EVERYDAY",
  },
  {
    id: 3,
    name: "Minimal Shoulder Bag",
    category: "Bags",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
    label: "UNDER ₹1K",
  },
  {
    id: 4,
    name: "Everyday Sneakers",
    category: "Shoes",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    label: "TRENDING",
  },
  {
    id: 5,
    name: "Elegant Neutral Dress",
    category: "Dresses",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=85",
    label: "NEW STYLE",
  },
  {
    id: 6,
    name: "Relaxed White Shirt",
    category: "Tops",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1598554747436-c9293d6c7f8a?auto=format&fit=crop&w=700&q=85",
    label: "WARDROBE ESSENTIAL",
  },
];

function App() {
    useEffect(() => {
    async function testCloudConnection() {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error("Supabase connection failed:", error.message);
      } else {
        console.log("FitFusion cloud connected successfully!");
        console.log("Products from cloud:", data);
      }
    }

    testCloudConnection();
  }, []);
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState(3000);
  const [image, setImage] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const visibleProducts = products.filter((product) => {
    const categoryMatches =
      category === "All" || product.category === category;

    return categoryMatches && product.price <= budget;
  });

  function uploadImage(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload an image smaller than 10 MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <div className="fitfusion">
      {/* NAVIGATION */}
      <header className="navbar">
        <a className="brand" href="#">
          fitfusion<span>.</span>
        </a>

        <nav>
          <a href="#discover">Discover</a>
          <a href="#categories">Categories</a>
          <a href="#shop">Shop</a>
        </nav>

        <a className="nav-cta" href="#discover">
          Find my style ↗
        </a>
      </header>

      {/* HERO */}
      <main>
        <section className="hero">
          <div className="hero-text">
            <span className="overline">YOUR AI-POWERED STYLE COMPANION</span>

            <h1>
              Style you love.
              <br />
              <em>Prices you don't.</em>
            </h1>

            <p>
              Your favourite outfits, reimagined for your budget.
              Discover inspiration, recreate the look, and make
              every outfit your own.
            </p>

            <div className="hero-actions">
              <a href="#discover" className="dark-btn">
                Find your outfit <span>↗</span>
              </a>

              <a href="#shop" className="text-btn">
                Explore styles ↓
              </a>
            </div>

            <div className="hero-note">
              <span>✳</span> FIND IT. STYLE IT. MAKE IT YOURS.
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90"
              alt="Fashion outfit inspiration"
            />

            <div className="floating-card">
              <span className="floating-icon">✳</span>
              <div>
                <strong>Your style, your budget.</strong>
                <p>Endless ways to recreate a look.</p>
              </div>
            </div>

            <span className="image-caption">STYLE INSPIRATION / 001</span>
          </div>
        </section>

        {/* DISCOVER / UPLOAD */}
        <section className="upload-section" id="discover">
          <div className="section-title">
            <span className="overline">THE MAGIC STARTS HERE</span>
            <h2>See it. Upload it. Find it.</h2>
            <p>
              Found an outfit you love? Let's find similar pieces
              without the designer price tag.
            </p>
          </div>

          <label className="upload-area">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={uploadImage}
              hidden
            />

            {image ? (
              <div className="uploaded-content">
                <img src={image} alt="Uploaded outfit inspiration" />

                <div className="uploaded-message">
                  <strong>Your inspiration is uploaded!</strong>
                  <p>
                    Your image is ready. AI outfit analysis will be
                    connected in our next development stage.
                  </p>
                  <span className="upload-again">
                    Click here to change image
                  </span>
                </div>
              </div>
            ) : (
              <div className="upload-inner">
                <div className="upload-symbol">↑</div>
                <h3>Drop your inspiration here</h3>
                <p>
                  Upload an outfit from Instagram, Pinterest, or your gallery
                </p>
                <span className="upload-btn">Choose image</span>
                <small>PNG, JPG or WEBP · Max 10 MB</small>
              </div>
            )}
          </label>
        </section>

        {/* CATEGORIES */}
        <section className="categories-section" id="categories">
          <div className="section-title left">
            <span className="overline">EXPLORE BY CATEGORY</span>
            <h2>What's your style today?</h2>
          </div>

          <div className="category-grid">
            <a className="category-tile" href="#shop">
              <img
                src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=700&q=85"
                alt="Tops"
              />
              <span>Tops <b>↗</b></span>
            </a>

            <a className="category-tile" href="#shop">
              <img
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85"
                alt="Bottoms"
              />
              <span>Bottoms <b>↗</b></span>
            </a>

            <a className="category-tile" href="#shop">
              <img
                src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=85"
                alt="Dresses"
              />
              <span>Dresses <b>↗</b></span>
            </a>

            <a className="category-tile" href="#shop">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"
                alt="Shoes"
              />
              <span>Shoes <b>↗</b></span>
            </a>
          </div>
        </section>

        {/* SHOP */}
        <section className="shop-section" id="shop">
          <div className="shop-top">
            <div className="section-title left">
              <span className="overline">YOUR STYLE EDIT</span>
              <h2>Good style. Better prices.</h2>
              <p>Pieces worth adding to your wardrobe.</p>
            </div>

            <div className="budget-box">
              <div className="budget-heading">
                <span>Shopping budget</span>
                <strong>₹{budget.toLocaleString("en-IN")}</strong>
              </div>

              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />

              <div className="range-labels">
                <span>₹500</span>
                <span>₹5,000</span>
              </div>
            </div>
          </div>

          <div className="filters">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={category === item ? "filter active" : "filter"}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="results-label">
            <span>{visibleProducts.length} ITEMS</span>
            <span>{favorites.length} SAVED ♡</span>
          </div>

          <div className="products-grid">
            {visibleProducts.map((product) => (
              <article className="product" key={product.id}>
                <div className="product-photo">
                  <img src={product.image} alt={product.name} />
                  <span className="product-label">{product.label}</span>

                  <button
                    className={`heart ${
                      favorites.includes(product.id) ? "liked" : ""
                    }`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Add to wishlist"
                  >
                    {favorites.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="product-info">
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                </div>
              </article>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="no-products">
              <h3>No products found in this range.</h3>
              <p>Increase your budget or select another category.</p>
              <button onClick={() => setBudget(5000)}>View all products</button>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <a className="brand" href="#">
            fitfusion<span>.</span>
          </a>
          <p>Your inspiration. Your style. Your budget.</p>
        </div>

        <div className="footer-right">
          <span>MADE FOR THE WAY YOU STYLE.</span>
          <p>© 2026 FitFusion</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
