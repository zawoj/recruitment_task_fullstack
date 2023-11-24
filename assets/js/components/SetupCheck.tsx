// ./assets/js/components/Users.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Test from "./Test";

const SetupCheck = () => {
  const [setupCheck, setSetupCheck] = useState({});
  const [loading, setLoading] = useState(true);

  const getBaseUrl = () => {
    return "http://telemedi-zadanie.localhost";
  };

  const checkApiSetup = () => {
    const baseUrl = "http://telemedi-zadanie.localhost";
    axios
      .get(baseUrl + `/api/setup-check?testParam=1`)
      .then((response) => {
        let responseIsOK = response.data && response.data.testParam === 1;
        setSetupCheck(responseIsOK);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setSetupCheck(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    checkApiSetup();
  }, []); // Empty dependency array means this runs once after the initial render

  return (
    <div>
      <section className='row-section'>
        <div className='container'>
          <div className='row mt-5'>
            <div className='col-md-8 offset-md-2'>
              <h2 className='text-center'>
                <span>This is a test</span> @ Telemedi
              </h2>
              <Test />
              {loading ? (
                <div className={"text-center"}>
                  <span className='fa fa-spin fa-spinner fa-4x'></span>
                </div>
              ) : (
                <div className={"text-center"}>
                  {setupCheck === true ? (
                    <h3 className={"text-success text-bold"}>
                      <strong>React app works!</strong>
                    </h3>
                  ) : (
                    <h3 className={"text-error text-bold"}>
                      <strong>React app doesn't work :(</strong>
                    </h3>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SetupCheck;
