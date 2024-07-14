import React from "react";

const Subscribe = () => {
  return (
    <>
      <div className="sidebar__widget mb-55">
        <div className="sidebar__widget-content">
          {/* <h3 className="sidebar__widget-title mb-10 text-center">Subscribe to domainname.com</h3> */}
          <p className="sidebar__widget-title mb-60 text-center">Get the latest posts delivered right to your inbox</p>
          <div className="sidebar__search">
            <form  onSubmit={(e) => e.preventDefault()}>
              <div className="sidebar__search-input-2">
                <input type="text" placeholder="youremail@example.com" />
                <button type="submit">
                  Subscribe
                  {/* <i className="far fa-submit"></i> */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
