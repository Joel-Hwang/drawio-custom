
const plmUrl = window.location.protocol+'//'+window.location.hostname;
const drawUrl = window.location.protocol+'//'+window.location.host+'/'
    + (window.location.pathname.split('/').length>2?window.location.pathname.split('/')[1]:'');

let gXml = "";
let iframe;

window.onload = function () {
    window.resizeTo(1620, 1000);

    if(opener)
        opener.postMessage({ action: "xml" }, plmUrl);
    iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder", "0");
    window.addEventListener("message", postMessageDefault);
    iframe.setAttribute(
        "src",
        drawUrl +
        "/?splash=0&embed=1&ui=sketch&spin=1&proto=json&configure=1&ruler=1&zoom=4"
        //+"&"+encodeURIComponent('{"x":3,"y":100,"width":1000,"height":1000}')
    );
    document.body.appendChild(iframe);
};

function postMessageDefault(evt) {
    if (evt.data.length < 1) return;
    var msg = JSON.parse(evt.data);
    switch (msg.event) {
        case "getXml":
            gXml = msg.mxgraph;
            break;
        case "configure":
            editor.configure();
            break;
        case "init":
            editor.init(gXml);
            break;
        case "load":

            break;
        case "autosave":
            gXml = msg.xml;
            editor.autosave(gXml);
            break;
        case "save":
            editor.save(msg);
            break;
        case "exit":
            editor.close();
            break;
        case "export":
            editor.exportXml(msg);
            editor.close();
            break;
    }
}

let editor = {
    configure: () => {
        iframe.contentWindow.postMessage(
            JSON.stringify({
                action: "configure",
                config: {
                    defaultFonts: ["Humor Sans", "Helvetica", "Times New Roman"],
                },
            }),
            "*"
        );
    },
    init: (xml) => {
        iframe.contentWindow.postMessage(
            JSON.stringify({ action: "load", autosave: 1, xml: xml }),
            "*"
        );
        iframe.contentWindow.postMessage(
            JSON.stringify({ action: "status", modified: true }),
            "*"
        );
    },
    autosave: (xml) => {
        let xmlDoc = mxUtils.parseXml(xml);
        let encryptedModel = xmlDoc.querySelector("diagram").textContent;
        gXml = editor.decode(encryptedModel);
    },
    save: (msg) => {
        iframe.contentWindow.postMessage(
            JSON.stringify({
                action: "export",
                format: "png",
                //format: "xmlsvg",
                xml: msg.xml,
                spin: "Updating page",
            }),
            "*"
        );
    },
    exportXml: (msg) => {
        let img = msg.data;
        window.removeEventListener("message", postMessage);
        document.body.removeChild(iframe);
        let xmlDoc = mxUtils.parseXml(msg.xml);
        let encryptedModel = xmlDoc.querySelector("diagram").textContent;
        let decryptedModel = editor.decode(encryptedModel);

        opener.postMessage(
            { action: "saveImg", img, decryptedModel },
            plmUrl
        );
    },
    close:() =>{
        opener.postMessage(
            { action: "close" },
            plmUrl
        );
        window.close();
    },
    encode: (data) => {
        data = encodeURIComponent(data);
        if (data.length < 1) return;
        data = String.fromCharCode.apply(
            null,
            new Uint8Array(pako.deflateRaw(data))
        );
        data = btoa(data);
        return data;
    },
    decode: (data) => {
        data = atob(data);
        data = pako.inflateRaw(
            Uint8Array.from(data, (c) => c.charCodeAt(0)),
            { to: "string" }
        );
        data = decodeURIComponent(data);
        return data;
    },
};

