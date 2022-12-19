/**
 * loadScript loads multiple script via supporting multiple URLs at a time
 * 
 * For e.g: 
 * 
 * loadScript([{url: "www.treez.io/example.js", id: "id_name", className: "class_name"}], () => {
 *    console.log("Script is loaded successfully");
 * });
 * @param scriptsInfo 
 * @param callback 
 */
const loadScript = (scriptsInfo: {
  url: string,
  id: string | null,
  className: string | null
}[], callback: () => void) => {
  let count = scriptsInfo.length;
  function urlCallback () {
      return () => {
          if (--count < 1) {
              callback();
          }
      };
  }
  function loadScript (url: string, id: string | null, className: string | null) {
      const s = document.createElement("script");
      id && s.setAttribute("id", id);
      className && s.setAttribute("class", className);
      s.setAttribute("src", url);
      s.onload = urlCallback();
      document.head.appendChild(s);
  }

  scriptsInfo.forEach(element => {
    loadScript(element.url, element.id, element.className);
  });
};
export default loadScript;
