import { useCallback, useEffect, useMemo, useState } from 'react';

function normalizeApiData(data) {
  return Array.isArray(data) ? data : data?.results || [];
}

function itemLabel(item, fields) {
  for (const field of fields) {
    if (item?.[field]) {
      return String(item[field]);
    }
  }
  return 'No label available';
}

function itemPreview(item) {
  const cloned = { ...item };
  return JSON.stringify(cloned, null, 2);
}

function SharedResourceView({ title, resourcePath, displayFields }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const endpoint = useMemo(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    return codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/${resourcePath}/`
      : `http://localhost:8000/api/${resourcePath}/`;
  }, [resourcePath]);

  const fetchItems = useCallback(() => {
    setLoading(true);
    setError('');

    console.log(`${title} endpoint:`, endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`${title} fetched data:`, data);
        setItems(normalizeApiData(data));
      })
      .catch((fetchError) => {
        console.error(`${title} fetch error:`, fetchError);
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, title]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    if (!search.trim()) {
      return items;
    }

    const searchValue = search.toLowerCase();
    return items.filter((item) => {
      const label = itemLabel(item, displayFields).toLowerCase();
      const raw = JSON.stringify(item).toLowerCase();
      return label.includes(searchValue) || raw.includes(searchValue);
    });
  }, [displayFields, items, search]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h2 className="h4 mb-0 text-primary">{title}</h2>
          <div className="d-flex align-items-center gap-3">
            <a className="link-primary fw-semibold" href={endpoint} rel="noreferrer" target="_blank">
              Open REST endpoint
            </a>
            <button className="btn btn-primary" onClick={fetchItems} type="button">
              Refresh Data
            </button>
          </div>
        </div>

        <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <label className="form-label fw-semibold" htmlFor={`${resourcePath}-search`}>
              Search in {title}
            </label>
            <input
              className="form-control"
              id={`${resourcePath}-search`}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Type to filter results"
              type="text"
              value={search}
            />
          </div>
          <div className="col-md-4 d-grid">
            <button className="btn btn-outline-secondary" onClick={() => setSearch('')} type="button">
              Clear Filter
            </button>
          </div>
        </form>

        {loading && <p className="mb-0">Loading {title.toLowerCase()}...</p>}
        {error && <p className="text-danger mb-0">Error: {error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: '80px' }}>
                    #
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Preview</th>
                  <th scope="col" style={{ width: '160px' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 && (
                  <tr>
                    <td className="text-muted" colSpan={4}>
                      No records found.
                    </td>
                  </tr>
                )}
                {filteredItems.map((item, index) => (
                  <tr key={item.id || item._id || `${resourcePath}-${index}`}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{itemLabel(item, displayFields)}</td>
                    <td className="text-muted small">{Object.keys(item).join(', ') || 'No fields'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSelectedItem(item)}
                        type="button"
                      >
                        View JSON
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedItem && (
        <>
          <div aria-labelledby={`${resourcePath}-modal-label`} aria-modal="true" className="modal fade show d-block" role="dialog" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5" id={`${resourcePath}-modal-label`}>
                    {title} Record Details
                  </h3>
                  <button aria-label="Close" className="btn-close" onClick={() => setSelectedItem(null)} type="button" />
                </div>
                <div className="modal-body">
                  <pre className="bg-light border rounded p-3 mb-0">{itemPreview(selectedItem)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedItem(null)} type="button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} role="presentation" />
        </>
      )}
    </section>
  );
}

export default SharedResourceView;
