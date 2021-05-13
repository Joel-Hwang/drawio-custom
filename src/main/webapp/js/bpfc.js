
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
    window.addEventListener("message", postMessageBpfc);
    iframe.setAttribute(
        "src",
        drawUrl +
        "/?splash=0&clibs=U"+encodeURIComponent(drawUrl+'/stencils/bpfc/BPFC')+"&embed=1&ui=sketch&spin=1&proto=json&configure=1&ruler=1&zoom=4&viewbox=" +
        encodeURIComponent('{"x":3,"y":100,"width":1000,"height":1000}')
    );

    document.body.appendChild(iframe);
};

function postMessageBpfc(evt) {
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
            //console.log(msg.event);
            //console.log(msg.xml);
            break;
        case "autosave":
            gXml = msg.xml;
            editor.autosave(gXml);
            break;
        case "save":
            editor.save(msg);
            break;
        case "exit":
            this.close();
            break;
        case "export":
            editor.exportXml(msg);
            this.close();
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

let custom = {
    onClickPrc: () => {
        document.querySelector("#popPrc").style.display = "unset";
        popPrc.load();
    },
    onClickMat: () => {
        document.querySelector("#popMat").style.display = "unset";
        popMat.load();
    },
};

let popMat = {
    data: [
        {
            _part_type: "MIDSOLE",
            _mat_name: "CMP-SKIN ON (MWCMP001)",
            _mat_cd: "244309",
        },
        {
            _part_type: "MIDSOLE",
            _mat_name: "CMP-SKIN OFF (MWCMP001)",
            _mat_cd: "245309",
        },
        {
            _part_type: "MIDSOLE",
            _mat_name: "CMP-SKIN IN (MWCMP001)",
            _mat_cd: "246309",
        },
        {
            _part_type: "MIDSOLE",
            _mat_name: "CMP-SKIN OUT (MWCMP001)",
            _mat_cd: "247309",
        },
        {
            _part_type: "MIDSOLE",
            _mat_name: "CMP-SKIN AT (MWCMP001)",
            _mat_cd: "248309",
        },
        {
            _part_type: "MIDSOLE",
            _mat_name: "CMP-SKIN AT (MWCMP001)",
            _mat_cd: "248309",
        },
        {
            _part_type: "MIDSOLE",
            _mat_name: "CMP-SKIN AT (MWCMP001)",
            _mat_cd: "248309",
        },
    ],
    loc: {
        x: 40,
        y: 130,
    },
    load: () => {
        let popMatContents = document.querySelector("#popMatContents");
        let tmp = document.querySelector("#matCard");
        for (let mat of popMat.data) {
            tmp.content.querySelector('div[name="_part_type"').textContent =
                mat._part_type;
            tmp.content.querySelector('div[name="_mat_name"').textContent =
                mat._mat_name;
            tmp.content.querySelector('div[name="_mat_cd"').textContent =
                mat._mat_cd;
            let clone = tmp.content.cloneNode(true);
            popMatContents.appendChild(clone);
        }
    },
    onClickItem: (obj) => {
        if (obj.dataset.select === "true") {
            obj.classList = "card";
            obj.dataset.select = false;
        } else {
            obj.classList = "card select";
            obj.dataset.select = true;
        }
    },
    onClickOk: () => {
        // iframe load action을 다시 날려야 함
        let xmlDoc = mxUtils.parseXml(gXml);
        for (let mat of document.querySelectorAll(
            "#popMatContents .card.select"
        )) {
            let _mat_cd = mat.querySelector('div[name="_mat_cd"]').textContent;
            let _mat_name = mat.querySelector('div[name="_mat_name"]')
                .textContent;

            let mxCell = xmlDoc.createElement("mxCell");
            let mxCells = xmlDoc.querySelectorAll("mxCell");
            mxCell.id = Number(mxCells[mxCells.length - 1].id) + 1;
            mxCell.setAttribute("value", `<b>${_mat_name}(#${_mat_cd})</b>`);
            mxCell.setAttribute(
                "style",
                "rounded=1;whiteSpace=wrap;html=1;arcSize=25;fillColor=#ffff99;strokeColor=none;"
            );
            mxCell.setAttribute("vertex", "1");
            mxCell.setAttribute("parent", "1");

            mxCell.innerHTML = `<mxGeometry x="${(popMat.loc.x += 150)}" y="${popMat.loc.y}" width="140" height="60" as="geometry"/>`;
            xmlDoc.querySelector("root").appendChild(mxCell);
        }
        popMat.loc.x += 50;
        popMat.loc.y += 50;
        gXml = mxUtils.getXml(xmlDoc);
        iframe.contentWindow.postMessage(
            JSON.stringify({ action: "load", xml: gXml }),
            "*"
        );

        document.querySelector("#popMat").style.display = "none";
        document.querySelector("#popMatContents").innerHTML = "";
    },
    onClickCancel: () => {
        document.querySelector("#popMatContents").innerHTML = "";
        document.querySelector("#popMat").style.display = "none";
    },
};

let popPrc = {
    data: [
        {
            _proc_name: "Primer",
            _chemical: "UE-312",
        },
        {
            _proc_name: "Primer",
            _chemical: "224-2L",
        },
        {
            _proc_name: "Primer",
            _chemical: "PR-505",
        },
        {
            _proc_name: "Primer",
            _chemical: "302-2",
        },
        {
            _proc_name: "Primer",
            _chemical: "UE-311",
        },
        {
            _proc_name: "Cement",
            _chemical: "SW-07",
        },
        {
            _proc_name: "Cement",
            _chemical: "6300U-2",
        },
        {
            _proc_name: "Cement",
            _chemical: "WA-1C",
        },
        {
            _proc_name: "Cement",
            _chemical: "6100U-2",
        },
        {
            _proc_name: "Cement",
            _chemical: "NP-57",
        },
    ],
    loc: {
        x: 40,
        y: 210,
    },
    load: (prc,chem) => {
        let popContents = document.querySelector("#popPrcContents");
        popContents.innerHTML = "";
        let tmp = document.querySelector("#prcCard");
        let tempAr = popPrc.data.filter(function(n){
            if(!prc && !chem) return true;
            if(n._proc_name.toLowerCase().indexOf(prc.toLowerCase()) >=0
                && n._chemical.toLowerCase().indexOf(chem.toLowerCase()) >=0 ) return true;
            else return false;
        });
        for (let data of tempAr) {
            tmp.content.querySelector('div[name="_proc_name"').textContent =
                data._proc_name;
            tmp.content.querySelector('div[name="_chemical"').textContent =
                data._chemical;
            let clone = tmp.content.cloneNode(true);
            popContents.appendChild(clone);
        }
    },
    onClickItem: (obj) => {
        if (obj.dataset.select === "true") {
            obj.classList = "card";
            obj.dataset.select = false;
        } else {
            obj.classList = "card select";
            obj.dataset.select = true;
        }
    },
    onClickOk: () => {
        // iframe load action을 다시 날려야 함
        let xmlDoc = mxUtils.parseXml(gXml);
        for (let elem of document.querySelectorAll(
            "#popPrcContents .card.select"
        )) {
            let _proc_name = elem.querySelector('div[name="_proc_name"]')
                .textContent;
            let _chemical = elem.querySelector('div[name="_chemical"]')
                .textContent;
            let _brush = elem.querySelector('input[name="_brush"]').value;
            let _tmpr = elem.querySelector('input[name="_tmpr"]').value;

            let mxCells = xmlDoc.querySelectorAll("mxCell");

            let mxObj = xmlDoc.createElement('object');
            mxObj.id = Number(mxCells[mxCells.length - 1].id) + 1;
            mxObj.setAttribute("dry","no");
            mxObj.setAttribute("chamber","");
            let mxCellGroup = xmlDoc.createElement("mxCell");
            mxCellGroup.setAttribute("style", "group");
            mxCellGroup.setAttribute("vertex", "1");
            mxCellGroup.setAttribute("parent", "1");
            mxCellGroup.innerHTML = `<mxGeometry x="${(popPrc.loc.x += 150)}" y="${
                popPrc.loc.y
            }" width="140" height="60" as="geometry"/>`;
            mxObj.appendChild(mxCellGroup);
            xmlDoc.querySelector("root").appendChild(mxObj);

            let mxCell = xmlDoc.createElement("mxCell");
            mxCell.id = Number(mxObj.id) + 1;
            mxCell.setAttribute(
                "value",
                `${_proc_name} ${_chemical} \n(${_tmpr})`
            );
            mxCell.setAttribute("style", "rounded=0;whiteSpace=wrap;html=1;");
            mxCell.setAttribute("vertex", "1");
            mxCell.setAttribute("parent", mxObj.id);
            mxCell.innerHTML = `<mxGeometry width="140" height="60" as="geometry"/>`;
            xmlDoc.querySelector("root").appendChild(mxCell);

            let mxCellBrush = xmlDoc.createElement("mxCell");
            mxCellBrush.id = Number(mxCell.id) + 1;
            mxCellBrush.setAttribute("value", _brush);
            mxCellBrush.setAttribute("vertex", "1");
            mxCellBrush.setAttribute("parent", mxObj.id);
            mxCellBrush.innerHTML = `<mxGeometry width="20" height="20" as="geometry"/>`;

            switch (_brush) {
                case "A":
                    mxCellBrush.setAttribute(
                        "style",
                        "rounded=0;whiteSpace=wrap;html=1;strokeColor=#432D57;fillColor=#E41A1C;fontColor=#ffffff;"
                    );
                    xmlDoc.querySelector("root").appendChild(mxCellBrush);
                    break;
                case "B":
                    mxCellBrush.setAttribute(
                        "style",
                        "rounded=0;whiteSpace=wrap;html=1;strokeColor=#006EAF;fillColor=#A65628;fontColor=#ffffff;"
                    );
                    xmlDoc.querySelector("root").appendChild(mxCellBrush);
                    break;
                case "C":
                    mxCellBrush.setAttribute(
                        "style",
                        "rounded=0;whiteSpace=wrap;html=1;strokeColor=#999900;fillColor=#A1A120;fontColor=#ffffff;"
                    );
                    xmlDoc.querySelector("root").appendChild(mxCellBrush);
                    break;
                case "D":
                    mxCellBrush.setAttribute(
                        "style",
                        "rounded=0;whiteSpace=wrap;html=1;strokeColor=#999900;fillColor=#FF7F00;fontColor=#ffffff;"
                    );
                    xmlDoc.querySelector("root").appendChild(mxCellBrush);
                    break;
                case "E":
                    mxCellBrush.setAttribute(
                        "style",
                        "rounded=0;whiteSpace=wrap;html=1;strokeColor=#999900;fillColor=#0BB890;fontColor=#ffffff;"
                    );
                    xmlDoc.querySelector("root").appendChild(mxCellBrush);
                    break;
                default:
                    break;
            }
        }
        popPrc.loc.x = 40;
        popPrc.loc.y += 80;
        gXml = mxUtils.getXml(xmlDoc);
        iframe.contentWindow.postMessage(
            JSON.stringify({ action: "load", xml: gXml }),
            "*"
        );

        document.querySelector("#popPrc").style.display = "none";
        document.querySelector("#popPrcContents").innerHTML = "";
    },
    onClickCancel: () => {
        document.querySelector("#popPrcContents").innerHTML = "";
        document.querySelector("#popPrc").style.display = "none";
    },
    onSearch: () =>{
        let srchPrc = document.querySelector('#popPrc div input[name="srchPrc"]').value;
        let srchChem = document.querySelector('#popPrc div input[name="srchChem"]').value;
        popPrc.load(srchPrc,srchChem);
    }
};
