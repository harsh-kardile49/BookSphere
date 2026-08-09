import { LIBRARY_STATS } from "../data/booksData";

const LibraryStatsWidget = () => {
  return (
    <div className="panel-card">
      <div className="panel-title-row">
        <h3 className="panel-title">Library Statistics</h3>
      </div>

      <div className="stat-widget-grid">
        <div className="stat-widget-item">
          <div className="stat-widget-val">
            {LIBRARY_STATS.totalBooks.toLocaleString()}
          </div>
          <div className="stat-widget-lbl">Total Books</div>
        </div>

        <div className="stat-widget-item">
          <div className="stat-widget-val" style={{ color: "var(--bs-emerald)" }}>
            {LIBRARY_STATS.availableBooks.toLocaleString()}
          </div>
          <div className="stat-widget-lbl">Available</div>
        </div>

        <div className="stat-widget-item">
          <div className="stat-widget-val" style={{ color: "var(--bs-indigo)" }}>
            {LIBRARY_STATS.issuedBooks}
          </div>
          <div className="stat-widget-lbl">Issued</div>
        </div>

        <div className="stat-widget-item">
          <div className="stat-widget-val" style={{ color: "var(--bs-red)" }}>
            {LIBRARY_STATS.overdueBooks}
          </div>
          <div className="stat-widget-lbl">Overdue</div>
        </div>
      </div>
    </div>
  );
};

export default LibraryStatsWidget;
