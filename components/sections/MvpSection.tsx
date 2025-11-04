'use client';

const MvpSection = () => {
  return (
    <section className="mvp-section">
      <div className="mvp-background">
        <div className="mvp-background-color" />
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/dd038af25bd1387299377cb87f07537e5e603514?width=2880" 
          alt=""
          className="mvp-background-image"
        />
      </div>

      <div className="mvp-content-wrapper">
        <div className="mvp-title-group">
          <div className="mvp-title-main">
            <span>Rasakan Madu Asli Dari </span>
          </div>
          <div className="mvp-title-highlight-wrapper">
            <div className="mvp-title-highlight">
              <span>Sumbernya</span>
            </div>
            <div className="mvp-title-underline" />
          </div>
        </div>

        <p className="mvp-description">
          Selamat datang di Madu Marles, tempat di mana keaslian dan kualitas bertemu. Kami bangga mempersembahkan madu 100% asli, dipanen langsung dari peternakan lebah alami tanpa campuran bahan apapun. Setiap tetes madu kami adalah hasil dari alam yang murni, yang diproses dengan hati-hati untuk menjaga manfaat dan kualitasnya.
        </p>

        <button className="mvp-cta-button">
          <span>Beli Sekarang</span>
        </button>
      </div>

      <style jsx>{`
        .mvp-section {
          position: relative;
          width: 100%;
          height: 829px;
          overflow: hidden;
        }

        .mvp-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .mvp-background-color {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #FFDE7D;
        }

        .mvp-background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mvp-content-wrapper {
          position: absolute;
          left: 77px;
          top: 284px;
          display: flex;
          width: 654px;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 18px;
        }

        .mvp-title-group {
          position: relative;
          width: 452px;
          height: 133.894px;
        }

        .mvp-title-main {
          position: absolute;
          left: 0;
          top: 0;
          width: 452px;
          color: #000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 48px;
          font-weight: 800;
          line-height: normal;
        }

        .mvp-title-highlight-wrapper {
          position: absolute;
          left: 110px;
          top: 65px;
          width: 265px;
          height: 69px;
        }

        .mvp-title-highlight {
          position: absolute;
          left: 0;
          top: 0;
          width: 265px;
          height: 64px;
          color: #00B8A9;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 48px;
          font-weight: 800;
          line-height: normal;
        }

        .mvp-title-underline {
          position: absolute;
          left: 0;
          top: 58px;
          width: 264px;
          height: 11px;
          background: #000;
        }

        .mvp-description {
          align-self: stretch;
          color: #000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: normal;
        }

        .mvp-cta-button {
          display: flex;
          width: 240px;
          padding: 19px 13px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border-radius: 8px;
          border: 1px solid #767676;
          background: #262626;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .mvp-cta-button:hover {
          background: #333333;
        }

        .mvp-cta-button:active {
          background: #1a1a1a;
        }

        .mvp-cta-button span {
          color: #F9FAFB;
          font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
          text-decoration: underline;
        }

        @media (max-width: 1024px) {
          .mvp-section {
            height: 700px;
          }

          .mvp-content-wrapper {
            left: 40px;
            top: 200px;
            width: calc(100% - 80px);
            max-width: 654px;
          }

          .mvp-title-group {
            width: 100%;
            max-width: 452px;
            height: auto;
          }

          .mvp-title-main {
            position: relative;
            width: 100%;
            font-size: 40px;
          }

          .mvp-title-highlight-wrapper {
            position: relative;
            left: 0;
            top: 10px;
            margin-top: 10px;
            width: 100%;
            max-width: 265px;
          }
        }

        @media (max-width: 768px) {
          .mvp-section {
            height: 600px;
          }

          .mvp-content-wrapper {
            left: 20px;
            top: 150px;
            width: calc(100% - 40px);
          }

          .mvp-title-main {
            font-size: 32px;
          }

          .mvp-title-highlight {
            font-size: 32px;
          }

          .mvp-title-underline {
            width: 100%;
            max-width: 200px;
          }

          .mvp-description {
            font-size: 13px;
          }

          .mvp-cta-button {
            width: 100%;
            max-width: 240px;
          }
        }

        @media (max-width: 480px) {
          .mvp-section {
            height: 500px;
          }

          .mvp-content-wrapper {
            top: 100px;
          }

          .mvp-title-main {
            font-size: 28px;
          }

          .mvp-title-highlight {
            font-size: 28px;
          }

          .mvp-cta-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default MvpSection;
