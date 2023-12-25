const InitialLoadingScreen = () => {
  return (
    <div className={`loading-container d-flex flex-column align-items-center`}>
      <h3 className="app-title">How&apos;s The Weather?</h3>
      <div className="info-loader-container">
        <p className="load-info">
          Please wait until we find your Geolocation for Weather Updates.
        </p>
        <span className="loader mx-auto mt-3 d-block"></span>
      </div>
    </div>
  );
};

export default InitialLoadingScreen;
