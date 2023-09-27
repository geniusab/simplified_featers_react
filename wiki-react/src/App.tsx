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
            <p>рендер</p>
            <p>
              рендер состоит из 3 фаз
              <ul>
                <li>
                  1 мы вызвем все рендер методы у лкассовых компонентов и
                  функциональные компоненты получеться на выходе ми имеем
                  большой js обьект с большой вложоность который явлеться дерево
                </li>
                <li>
                  2 этап это согласования у нас есть 2 дерева с предыдущего
                  этапа и текущий и сравниаме и измененый елемнт передаем дальше
                </li>
                <li>
                  3 этап фиксация мы добавляем html вызываем эфекти делаем все
                  что у нас было в виртуал доме
                </li>
              </ul>
            </p>
            <p>Fiber</p>
            добавили файберы и рядом с virtual dom появляеться такая шткуа как
            Fibers tree он создаеться для каждого компонента
          </div>
        </li>

        <li>REConciler : Fiber</li>
        <li>
          Когда реакт делет ре-рендер? - когда меняеться стаейт - пропсы -
          родитель ре-рендериться - контекст
        </li>
      </ul>
    </>
  );
}

export default App;
