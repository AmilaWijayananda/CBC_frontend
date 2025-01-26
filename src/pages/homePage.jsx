import './homePage.css'
export default function HomePage() {
    return (
      <div className="homepage">
        <header>
          <h1>Welcome to Our Website</h1>
          <p>Your go-to platform for amazing experiences.</p>
        </header>
        <section>
          <button onClick={() => alert("Explore more!")}>Explore Now</button>
        </section>
      </div>
    );
  }