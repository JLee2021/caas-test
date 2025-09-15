import "../index.css";
import React from "react";

function HomePage() {
  return (
      <div className="display-flex flex-column flex-align-center">
        <img src="/icons/radfish.png" alt="RADFish logo" height="200" />
        <h1 className="font-heading-xl margin-top-4 margin-bottom-2 text-center">
          My CaaS Test Application is Running!
        </h1>
        <p className="font-body-lg text-center margin-top-2">
          This is a simple RADFish-based web application for testing Container-as-a-Service (CaaS) deployment.
        </p>
        <div className="margin-top-4 padding-4 bg-base-lightest border-radius-md">
          <p className="margin-0 text-center">
            <strong>Status:</strong> Application is successfully running on port 8080
          </p>
        </div>
      </div>
  );
}

export default HomePage;
