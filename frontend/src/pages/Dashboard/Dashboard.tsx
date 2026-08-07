const Dashboard = () => {
  return (
    <div className="container-fluid">
      <h1 className="mb-4">Dashboard</h1>

      <div className="alert alert-primary">
        Welcome to <strong>BookSphere</strong> Library Management System.
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Total Books</h5>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Members</h5>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Borrowed</h5>
              <h2>0</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Returned</h5>
              <h2>0</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
