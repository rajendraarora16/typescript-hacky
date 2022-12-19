/**
 * loadScript loads multiple script via supporting multiple URLs at a time
 * 
 * For e.g: 
 * 
 * loadScript(["a.js", "b.js", "c.js"], () => {
 *    console.log("Script is loaded successfully");
 * });
 * 
 * @param scripts 
 * @param callback 
 */
const loadScript = (scripts: string[], ids: string[], callback: () => void) => {
  let count = scripts.length;
  // let id = ids.length;
  function urlCallback () {
      return () => {
          if (--count < 1) {
              callback();
          }
      };
  }
  function loadScript (url: string) {
      const s = document.createElement("script");
      s.setAttribute("id", "ze-snippet");
      s.setAttribute("src", url);
      s.onload = urlCallback();
      document.head.appendChild(s);
  }

  for (let script of scripts) {
      loadScript(script);
  }
};
export default loadScript;
