import "./App.css";

function App() {
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          <h4>Imperative and declarative programming</h4>

          <div>
            <b>declarative</b> code focuses on specifying the result of what you
            want
          </div>
          <p>
            This like UI should looks
            <code>
              <h4>
                name:
                <span style={{ color: "red" }}>{21}</span>
              </h4>

              {`<h4> name:
                  <span style={{ color: "red" }}>{21}</span>
                  </h4>`}
            </code>
          </p>

          <div>
            <p>
              <b>imperative</b> code focuses writing an explicit sequence of
              commands to describe how you want the computer to do thing
            </p>
            <div className="list">
              <p>/* create H4 */</p>
              <code>const h4 = document.createElement('h4');</code>
              <p>/* Put name in h4 */</p>
              <code> h4.innerText = 'name'</code>
              <p>/* create span in h4 that is red */</p>
              <code>
                const span = document.createElement('span'); span.style.color =
                'red'
              </code>
              <p>/* put age in that span */</p>
              <code>span.innerText = 21</code>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default App;
