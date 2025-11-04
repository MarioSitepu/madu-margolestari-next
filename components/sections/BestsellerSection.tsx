'use client';

const BestsellerSection = () => {
  return (
    <section className="bestseller-container">
      <div className="teal-background" />
      
      <img
        className="background-image"
        src="https://api.builder.io/api/v1/image/assets/TEMP/aeccf4423346ef2b8ca83bba13bfcca74d8833d2?width=2584"
        alt=""
      />
      
      <div className="product-card-wrapper">
        <div className="product-card-content">
          <div className="product-name">Lebah Cerana</div>
          <p className="product-description">
            Madu yang dihasilkan oleh lebah Cerana memiliki kualitas yang sangat baik, dengan rasa yang lebih lembut dan aroma yang khas, serta kandungan nutrisi yang lebih kaya.
          </p>
          <div className="price-wrapper">
            <span className="price-currency">Rp</span>
            <span className="price-amount">50.000</span>
          </div>
          <svg className="cart-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22Z" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.0498 2.05005H4.0498L6.7098 14.47C6.80738 14.9249 7.06048 15.3315 7.42552 15.6199C7.79056 15.9083 8.24471 16.0604 8.7098 16.05H18.4898C18.945 16.0493 19.3863 15.8933 19.7408 15.6079C20.0954 15.3224 20.3419 14.9246 20.4398 14.48L22.0898 7.05005H5.1198" stroke="#00B8A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <img
          className="product-bottle-image"
          src="https://api.builder.io/api/v1/image/assets/TEMP/6c2fa47fd4cfdfeff1411188049750a9848bfa2d?width=488"
          alt=""
        />
      </div>

      <div className="title-wrapper">
        <div className="title-container">
          <div className="title-main">
            Produk Paling<br />Banyak 
          </div>
          <div className="title-highlight-wrapper">
            <div className="title-highlight">Terjual</div>
            <div className="highlight-underline" />
          </div>
        </div>
      </div>

      <p className="section-description">
        Madu Hutan Premium kami adalah produk best seller yang telah memikat hati pelanggan setia kami. Dipanen langsung dari hutan alami, madu ini mengandung berbagai nektar bunga pilihan yang memberikan rasa khas dan manfaat luar biasa. Setiap tetesnya kaya akan nutrisi dan antioksidan alami yang dapat mendukung daya tahan tubuh dan meningkatkan kesehatan secara keseluruhan.
      </p>

      <style jsx>{`
         .bestseller-container {
           position: relative;
           width: 100%;
           height: 786px;
           background: #FFF;
           overflow: hidden;
         }

        .teal-background {
          position: absolute;
          width: 100vw;
          height: 100%;
          background: #00B8A9;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
        }

        .background-image {
          position: absolute;
          width: 1292px;
          height: 786px;
          left: 200px;
          top: 0;
          object-fit: cover;
        }

        .product-card-wrapper {
          position: absolute;
          width: 382px;
          height: 699px;
          left: 163px;
          top: 20px;
        }

        .product-card-content {
          position: absolute;
          width: 382px;
          height: 587px;
          left: 0;
          top: 112px;
          background: #FFDE7D;
          border-radius: 4px;
          box-shadow: 0 4px 4px 0 #000;
        }

        .product-bottle-image {
          position: absolute;
          width: 244px;
          height: 524px;
          left: 67px;
          top: 0;
          object-fit: contain;
        }

        .product-name {
          position: absolute;
          left: 24px;
          top: 421px;
          width: 158px;
          height: 32px;
          color: #00B8A9;
          text-align: right;
          font-family: Nort, -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 24px;
          font-weight: 500;
          line-height: normal;
        }

        .product-description {
          position: absolute;
          left: 24px;
          top: 457px;
          width: 302px;
          height: 76px;
          color: #000;
          font-family: Nort, -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: normal;
          margin: 0;
        }

        .price-wrapper {
          position: absolute;
          left: 24px;
          top: 533px;
          width: 99px;
          height: 32px;
          display: flex;
          align-items: baseline;
        }

        .price-currency {
          color: #000;
          text-align: right;
          font-family: Nort, -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 15px;
          font-weight: 500;
          line-height: normal;
          margin-right: 3px;
        }

        .price-amount {
          color: #00B8A9;
          text-align: right;
          font-family: Nort, -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 24px;
          font-weight: 500;
          line-height: normal;
        }

        .cart-icon {
          position: absolute;
          left: 326px;
          top: 649px;
          width: 24px;
          height: 24px;
        }

        .title-wrapper {
          position: absolute;
          width: 330px;
          height: 133px;
          left: 1168px;
          top: 152px;
        }

        .title-container {
          position: relative;
          width: 330px;
          height: 133px;
        }

        .title-main {
          position: absolute;
          left: 0;
          top: 0;
          width: 330px;
          height: 128px;
          color: #FFF;
          font-family: Nort, -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 48px;
          font-weight: 700;
          line-height: normal;
        }

        .title-highlight-wrapper {
          position: absolute;
          width: 156px;
          height: 69px;
          left: 174px;
          top: 64px;
        }

        .title-highlight {
          position: absolute;
          left: 0;
          top: 0;
          width: 156px;
          height: 64px;
          color: #FFDE7D;
          font-family: Nort, -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 48px;
          font-weight: 800;
          line-height: normal;
        }

        .highlight-underline {
          position: absolute;
          width: 156px;
          height: 11px;
          left: 0;
          top: 58px;
          background: #000;
        }

        .section-description {
          position: absolute;
          left: 1218px;
          top: 317px;
          width: 280px;
          height: 209px;
          color: #FFF;
          text-align: right;
          font-family: Nort, -apple-system, Roboto, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: normal;
          margin: 0;
        }

        @media (max-width: 1440px) {
          .bestseller-container {
            padding: 0 20px;
          }

          .background-image {
            width: 100%;
            max-width: 1292px;
          }

          .product-card-wrapper {
            left: 7.85%;
          }

          .background-image {
            left: 200px;
          }

          .title-wrapper {
            left: 81.11%;
          }

          .section-description {
            left: 84.58%;
          }
        }

        @media (max-width: 1200px) {
          .bestseller-container {
            height: auto;
            min-height: 600px;
            padding: 40px 20px;
          }

          .background-image {
            position: relative;
            width: 100%;
            height: auto;
            margin-bottom: 20px;
          }

          .product-card-wrapper {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            margin-bottom: 40px;
          }

          .title-wrapper {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            margin-bottom: 20px;
          }

          .section-description {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            text-align: center;
            margin-bottom: 40px;
          }
        }

        @media (max-width: 768px) {
          .bestseller-container {
            min-height: 500px;
            padding: 30px 15px;
          }

          .product-card-wrapper {
            width: 100%;
            max-width: 350px;
            height: auto;
          }

          .product-card-content {
            width: 100%;
            height: auto;
            padding-bottom: 20px;
          }

          .product-bottle-image {
            width: 200px;
            height: auto;
            left: 50%;
            transform: translateX(-50%);
          }

          .product-name {
            top: 400px;
            text-align: center;
            width: 100%;
            left: 0;
          }

          .product-description {
            top: 436px;
            width: calc(100% - 48px);
            text-align: center;
          }

          .price-wrapper {
            top: 520px;
            left: 50%;
            transform: translateX(-50%);
          }

          .cart-icon {
            left: 50%;
            transform: translateX(-50%);
            top: 560px;
          }

          .title-wrapper {
            width: 100%;
            max-width: 300px;
            height: auto;
          }

          .title-container {
            width: 100%;
            height: auto;
          }

          .title-main {
            width: 100%;
            height: auto;
            font-size: 36px;
            text-align: center;
          }

          .title-highlight-wrapper {
            left: 50%;
            transform: translateX(-50%);
            top: 80px;
          }

          .title-highlight {
            font-size: 36px;
          }

          .section-description {
            width: 100%;
            max-width: 280px;
            height: auto;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .bestseller-container {
            padding: 20px 10px;
          }

          .product-card-wrapper {
            max-width: 300px;
          }

          .product-bottle-image {
            width: 160px;
          }

          .product-name {
            font-size: 20px;
            top: 360px;
          }

          .product-description {
            font-size: 12px;
            top: 396px;
          }

          .price-wrapper {
            top: 480px;
          }

          .price-currency {
            font-size: 13px;
          }

          .price-amount {
            font-size: 20px;
          }

          .cart-icon {
            top: 520px;
          }

          .title-main {
            font-size: 28px;
          }

          .title-highlight {
            font-size: 28px;
          }

          .title-highlight-wrapper {
            width: 120px;
          }

          .highlight-underline {
            width: 120px;
          }

          .section-description {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default BestsellerSection;
