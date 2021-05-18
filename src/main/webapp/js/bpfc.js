
const plmUrl = window.location.protocol+'//'+window.location.hostname;
const drawUrl = window.location.protocol+'//'+window.location.host+'/'
    + (window.location.pathname.split('/').length>2?window.location.pathname.split('/')[1]:'');
let gXml = "";
let iframe;

const defaultXml = '<mxGraphModel dx="1285" dy="914" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="826" pageHeight="1169" background="#ffffff" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="4" value="&lt;b&gt;LU MAT. INFORMATION&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFCC;" parent="1" vertex="1"><mxGeometry x="20" y="120" width="138" height="16" as="geometry"/></mxCell><mxCell id="5" value="" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#000000;fillColor=#ffffff;" parent="1" vertex="1"><mxGeometry x="20" y="136" width="138" height="284" as="geometry"/></mxCell><mxCell id="6" value="&lt;b&gt;BRUSH TYPE&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFCC;" parent="1" vertex="1"><mxGeometry x="20" y="420" width="138" height="15" as="geometry"/></mxCell><mxCell id="7" value="" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#000000;fillColor=#ffffff;" parent="1" vertex="1"><mxGeometry x="20" y="435" width="138" height="72" as="geometry"/></mxCell><mxCell id="8" value="TEMP. CHECKING SPOTS" style="rounded=0;whiteSpace=wrap;html=1;" parent="1" vertex="1"><mxGeometry x="821" y="120" width="197" height="30" as="geometry"/></mxCell><mxCell id="9" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#e51400;fontColor=#ffffff;strokeColor=none;" parent="1" vertex="1"><mxGeometry x="827" y="127" width="16" height="16" as="geometry"/></mxCell><mxCell id="10" value="Mark &quot;M&quot; ON AUTO PROCESS" style="rounded=0;whiteSpace=wrap;html=1;align=right;" parent="1" vertex="1"><mxGeometry x="821" y="150" width="197" height="30" as="geometry"/></mxCell><mxCell id="11" value="&lt;b&gt;&lt;font color=&quot;#ffffff&quot;&gt;M&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;html=1;aspect=fixed;strokeColor=#FFFFFF;fillColor=#92D050;" parent="1" vertex="1"><mxGeometry x="824" y="153.75" width="22.5" height="22.5" as="geometry"/></mxCell><mxCell id="12" value="&lt;p style=&quot;margin-top: 0pt ; margin-bottom: 0pt ; margin-left: 0in ; text-indent: 0in&quot;&gt;&lt;br&gt;&lt;/p&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fillColor=#ffffff;strokeColor=#000000;" parent="1" vertex="1"><mxGeometry x="821" y="180" width="197" height="160" as="geometry"/></mxCell><mxCell id="13" value="&lt;b&gt;ATTACHING SEQUENCE&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFCC;" parent="1" vertex="1"><mxGeometry x="821" y="340" width="197" height="15" as="geometry"/></mxCell><mxCell id="14" value="&lt;p style=&quot;margin-top: 0pt ; margin-bottom: 0pt ; margin-left: 0in ; text-indent: 0in ; direction: ltr ; unicode-bidi: embed&quot;&gt;&lt;br&gt;&lt;/p&gt;" style="rounded=0;whiteSpace=wrap;html=1;movable=1;resizable=1;rotatable=1;deletable=1;editable=1;connectable=1;" parent="1" vertex="1"><mxGeometry x="821" y="355" width="197" height="152" as="geometry"/></mxCell><mxCell id="15" value="" style="endArrow=none;html=1;exitX=0;exitY=0;exitDx=0;exitDy=0;entryX=1;entryY=0;entryDx=0;entryDy=0;rounded=0;" parent="1" edge="1"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="120" as="sourcePoint"/><mxPoint x="1018" y="120" as="targetPoint"/></mxGeometry></mxCell><mxCell id="16" value="" style="endArrow=none;html=1;" parent="1" edge="1"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="158" y="507" as="sourcePoint"/><mxPoint x="821" y="507" as="targetPoint"/></mxGeometry></mxCell><mxCell id="17" value="" style="endArrow=none;html=1;entryX=1;entryY=0;entryDx=0;entryDy=0;rounded=0;" parent="1" edge="1"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="1018" y="507" as="sourcePoint"/><mxPoint x="1018" y="120" as="targetPoint"/></mxGeometry></mxCell><mxCell id="18" value="" style="endArrow=none;html=1;entryX=1;entryY=0;entryDx=0;entryDy=0;rounded=0;" parent="1" edge="1"><mxGeometry width="50" height="50" relative="1" as="geometry"><mxPoint x="20" y="507" as="sourcePoint"/><mxPoint x="20" y="120" as="targetPoint"/></mxGeometry></mxCell></root></mxGraphModel>';

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
    let msg = JSON.parse(evt.data);
    switch (msg.event) {
        case "getXml":
            gXml = msg.mxgraph;
            try{
                popMat.data = JSON.parse(msg.bomData);
            }catch{alert("Invalid format(bomData)");}

            try{
                popPrc.data = JSON.parse(msg.procData);
            }catch{alert("Invalid format(procData)");}

            if(!gXml) gXml = defaultXml;
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
    data: [ {id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "BF/PU 003", _part_name: "COLLAR LINING 1"}
    ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "BX/ 002", _part_name: "OUTER CARTON"}
    ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "LUS/PK 6033", _part_name: "TONGUE OLAY"}
    ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "LU1C1P/PK 6072", _part_name: "VAMP"}],
    loc: {
        x: 40,
        y: 130,
    },
    load: () => {
        let popMatContents = document.querySelector("#popMatContents");
        let tmp = document.querySelector("#matCard");
        for (let mat of popMat.data) {
            tmp.content.querySelector('div[name="_part_type"').id = mat.id;
            tmp.content.querySelector('div[name="_part_type"').textContent =
                mat._part_type;
            tmp.content.querySelector('div[name="_mat_name"').textContent =
                mat._mat_name;
            tmp.content.querySelector('div[name="_mat_cd"').textContent =
                mat._mat_cd;
            tmp.content.querySelector('div[name="_part_name"').textContent =
                mat._part_name;
            tmp.content.querySelector('div[name="_mcs_number"').textContent =
                mat._mcs_number;
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
    onClickOk: async () => {
        // iframe load action을 다시 날려야 함
        let xmlDoc = mxUtils.parseXml(gXml);
        let luMatParam = [];
        for (let mat of document.querySelectorAll(
            "#popMatContents .card.select"
        )) {
            let _mat_cd = mat.querySelector('div[name="_mat_cd"]').textContent;
            let _mat_name = mat.querySelector('div[name="_mat_name"]')
                .textContent;
            let _mcs_number = mat.querySelector('div[name="_mcs_number"]')
                .textContent;
            luMatParam.push(_mcs_number);
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
        let luMat = await popMat.retrieveLuMat(luMatParam);
        let mxCells = xmlDoc.querySelectorAll("mxCell");
        let mxCellLuMat = xmlDoc.createElement("mxCell");
        mxCellLuMat.id = Number(mxCells[mxCells.length - 1].id) + 1;
        mxCellLuMat.setAttribute("value", luMat);
        mxCellLuMat.setAttribute('style','text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;');
        mxCellLuMat.setAttribute("vertex", "1");
        mxCellLuMat.setAttribute("parent", "1");
        mxCellLuMat.innerHTML = `<mxGeometry x="${popMat.loc.x}" y="${popMat.loc.y+50}" width="650" height="180"  as="geometry"/>`;
        xmlDoc.querySelector("root").appendChild(mxCellLuMat);

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

    retrieveLuMat: async (param) => {
        let response = await fetch(drawUrl+'lumat',{
            method:'POST',
            headers: {
                'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify(param)
        });
        if (response.ok) {
            let res = '';
            let json = await response.json();
            for(let key of Object.keys(json)){
                res = res + key + ' : ' + json[key]+'\n\n';
            }
            return res;
        } else {
            alert("HTTP-Error: " + response.status);
            return null;
        }
    }
};

let popPrc = {
    data: [],
    loc: {
        x: 40,
        y: 210,
    },
    load: (prc,chem) => {
        let popContents = document.querySelector("#popPrcContents");
        popContents.innerHTML = "";
        let tmp = document.querySelector("#prcCard");
        let tempAr = popPrc.data.filter((n) => {
            if(!prc && !chem) return true;
            if(n._proc_name.toLowerCase().indexOf(prc.toLowerCase()) >=0
                && n._chemical.toLowerCase().indexOf(chem.toLowerCase()) >=0 ) return true;
            else return false;
        });
        for (let data of tempAr) {
            tmp.content.querySelector('div[name="_proc_name"').id = data.id;
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


