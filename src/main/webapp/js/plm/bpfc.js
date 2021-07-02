
const plmUrl = window.location.protocol+'//'+window.location.hostname;
const drawUrl = window.location.protocol+'//'+window.location.host+'/'
    + (window.location.pathname.split('/').length>2?window.location.pathname.split('/')[1]+'/':'');
let iframe;
let gXml = `
<mxGraphModel dx="873" dy="1125" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
  </root>
</mxGraphModel>`;
let bondType = '';
let tmplAssembly = `
<mxGraphModel dx="1092" dy="777" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="826" pageHeight="1169" background="#ffffff" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="4" value="&lt;b&gt;LU MAT. INFORMATION&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFCC;" parent="1" vertex="1">
      <mxGeometry x="80" y="120" width="138" height="16" as="geometry" />
    </mxCell>
    <mxCell id="5" value="" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#000000;fillColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="80" y="136" width="138" height="284" as="geometry" />
    </mxCell>
    <mxCell id="6" value="&lt;b&gt;BRUSH TYPE&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFCC;" parent="1" vertex="1">
      <mxGeometry x="80" y="420" width="138" height="15" as="geometry" />
    </mxCell>
    <mxCell id="7" value="" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#000000;fillColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="80" y="435" width="138" height="118" as="geometry" />
    </mxCell>
    <mxCell id="8" value="&lt;font style=&quot;font-size: 11px&quot;&gt;TEMP. CHECKING SPOTS&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;align=center;" parent="1" vertex="1">
      <mxGeometry x="830" y="120" width="180" height="30" as="geometry" />
    </mxCell>
    <mxCell id="9" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#e51400;fontColor=#ffffff;strokeColor=none;" parent="1" vertex="1">
      <mxGeometry x="833.25" y="127" width="16" height="16" as="geometry" />
    </mxCell>
    <mxCell id="10" value="&lt;font style=&quot;font-size: 11px&quot;&gt;Mark &quot;M&quot; ON AUTO PROCESS&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;align=right;" parent="1" vertex="1">
      <mxGeometry x="830" y="150" width="180" height="30" as="geometry" />
    </mxCell>
    <mxCell id="11" value="&lt;b&gt;&lt;font color=&quot;#ffffff&quot;&gt;M&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;html=1;aspect=fixed;strokeColor=#FFFFFF;fillColor=#92D050;" parent="1" vertex="1">
      <mxGeometry x="833.25" y="156" width="18" height="18" as="geometry" />
    </mxCell>
    <mxCell id="13" value="&lt;b&gt;ATTACHING SEQUENCE&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFCC;" parent="1" vertex="1">
      <mxGeometry x="860" y="420" width="150" height="15" as="geometry" />
    </mxCell>
    <mxCell id="15" value="" style="endArrow=none;html=1;exitX=0;exitY=0;exitDx=0;exitDy=0;rounded=0;" parent="1" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="100" y="240" as="sourcePoint" />
        <mxPoint x="100.00000000000045" y="240" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <object label="BOTTOM" type="part_type" id="19">
      <mxCell style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fontColor=#ffffff;fillColor=#92d050;strokeColor=none;" parent="1" vertex="1">
        <mxGeometry x="230" y="130" width="290" height="20" as="geometry" />
      </mxCell>
    </object>
    <object label="UPPER" type="part_type" id="20">
      <mxCell style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fontColor=#ffffff;fillColor=#92d050;strokeColor=none;" parent="1" vertex="1">
        <mxGeometry x="530" y="130" width="290" height="20" as="geometry" />
      </mxCell>
    </object>
    <mxCell id="60" value="" style="endArrow=none;html=1;" parent="1" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="1010" y="553" as="sourcePoint" />
        <mxPoint x="1010" y="120" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="61" value="" style="endArrow=none;html=1;" parent="1" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="1010" y="553" as="sourcePoint" />
        <mxPoint x="80" y="553" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="62" value="" style="endArrow=none;html=1;" parent="1" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="1010" y="120" as="sourcePoint" />
        <mxPoint x="80" y="120" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="63" value="" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#000000;fillColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="860" y="435" width="150" height="118" as="geometry" />
    </mxCell>
  </root>
</mxGraphModel>
`;
let tmplStockfit = `
<mxGraphModel dx="2048" dy="1214" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="826" pageHeight="1169" background="#ffffff" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="6" value="&lt;b&gt;BRUSH TYPE&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFCC;" parent="1" vertex="1">
      <mxGeometry x="80" y="420" width="138" height="15" as="geometry" />
    </mxCell>
    <mxCell id="7" value="" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#000000;fillColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="80" y="435" width="138" height="118" as="geometry" />
    </mxCell>
    <mxCell id="8" value="&lt;font style=&quot;font-size: 11px&quot;&gt;TEMP. CHECKING SPOTS&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;align=center;" parent="1" vertex="1">
      <mxGeometry x="830" y="120" width="180" height="30" as="geometry" />
    </mxCell>
    <mxCell id="9" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#e51400;fontColor=#ffffff;strokeColor=none;" parent="1" vertex="1">
      <mxGeometry x="833.25" y="127" width="16" height="16" as="geometry" />
    </mxCell>
    <mxCell id="10" value="&lt;font style=&quot;font-size: 11px&quot;&gt;Mark &quot;M&quot; ON AUTO PROCESS&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;align=right;" parent="1" vertex="1">
      <mxGeometry x="830" y="150" width="180" height="30" as="geometry" />
    </mxCell>
    <mxCell id="11" value="&lt;b&gt;&lt;font color=&quot;#ffffff&quot;&gt;M&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;html=1;aspect=fixed;strokeColor=#FFFFFF;fillColor=#92D050;" parent="1" vertex="1">
      <mxGeometry x="833.25" y="156" width="18" height="18" as="geometry" />
    </mxCell>
    <mxCell id="13" value="&lt;b&gt;ATTACHING SEQUENCE&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFCC;" parent="1" vertex="1">
      <mxGeometry x="860" y="420" width="150" height="15" as="geometry" />
    </mxCell>
    <mxCell id="15" value="" style="endArrow=none;html=1;exitX=0;exitY=0;exitDx=0;exitDy=0;rounded=0;" parent="1" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="100" y="240" as="sourcePoint" />
        <mxPoint x="100.00000000000045" y="240" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="60" value="" style="endArrow=none;html=1;" parent="1" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="1010" y="553" as="sourcePoint" />
        <mxPoint x="1010" y="120" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="61" value="" style="endArrow=none;html=1;" parent="1" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="1010" y="553" as="sourcePoint" />
        <mxPoint x="80" y="553" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="62" value="" style="endArrow=none;html=1;" parent="1" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="1010" y="120" as="sourcePoint" />
        <mxPoint x="80" y="120" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="63" value="" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#000000;fillColor=#ffffff;" parent="1" vertex="1">
      <mxGeometry x="860" y="435" width="150" height="118" as="geometry" />
    </mxCell>
    <mxCell id="64" value="" style="endArrow=none;html=1;" edge="1" parent="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="80" y="553" as="sourcePoint" />
        <mxPoint x="80" y="120" as="targetPoint" />
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel>
`;
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
        "?splash=0&clibs=U"+encodeURIComponent(drawUrl+'stencils/bpfc/BPFC')+"&embed=1&ui=sketch&spin=1&proto=json&configure=1&ruler=1&zoom=4&viewbox=" +
        encodeURIComponent('{"x":3,"y":100,"width":1000,"height":1000}')
    );

    document.body.appendChild(iframe);
};

function postMessageBpfc(evt) {
    if (evt.data.length < 1) return;
    let msg = JSON.parse(evt.data);
    switch (msg.event) {
        case "getXml":
            bondType = msg.type;
            if(bondType.toLowerCase() == 'ZX_BPFC_Assembly'.toLowerCase()) gXml = tmplAssembly;
            else gXml = tmplStockfit;
            document.querySelector('title').textContent = msg.title
            if(msg.mxgraph) gXml = msg.mxgraph;
            try{
                popMat.data = JSON.parse(msg.bomData);
            }catch{alert("Invalid format(bomData)");}

            try{
                popPrc.data = JSON.parse(msg.procData);
            }catch{alert("Invalid format(procData)");}
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
        try{
            let img = msg.data;
            window.removeEventListener("message", postMessage);
            document.body.removeChild(iframe);
            let xmlDoc = mxUtils.parseXml(msg.xml);
            let encryptedModel = xmlDoc.querySelector("diagram").textContent;
            let decryptedModel = editor.decode(encryptedModel);
            let lineLayout = gParser.getLineLayout(decryptedModel);
            let partIds = gParser.getPartIds(decryptedModel);
            localStorage.img = img;
            localStorage.decryptedModel = decryptedModel;
            localStorage.lineLayout = lineLayout;
            localStorage.partIds = partIds;
            editor.setClipboard(encodeURIComponent(decryptedModel));
            opener.postMessage(
                { action: "saveImg", img, decryptedModel, lineLayout, partIds },
                plmUrl
            );
        }catch(e){
            console.log(e);
            alert('invalid data format.');
        }

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
    getNewId : (xmlDoc) => {
        let res = 0;
        let children = xmlDoc.querySelectorAll("*");
        for(let child of children){
            let cur = Number(child.id?child.id:0);
            res = Math.max(res,cur);
        }
        return res+1;
    },
    getPos : (xmlDoc,category) => {
        let res = 0;
        let cur = 0;
        let mxGeometrys = xmlDoc.querySelectorAll("mxGeometry");
        for(let mxGeometry of mxGeometrys){
            switch(category){
                case 'top':
                    cur = Number(mxGeometry.getAttribute('y'));
                    res = Math.min(res,cur);
                    break;
                case 'bottom':
                    cur = Number(mxGeometry.getAttribute('y'))  + Number(mxGeometry.getAttribute('height'));
                    res = Math.max(res,cur);
                    break;
                case 'left':
                    cur = Number(mxGeometry.getAttribute('x')) ;
                    res = Math.min(res,cur);
                    break;
                case 'right':
                    cur = Number(mxGeometry.getAttribute('x'))  + Number(mxGeometry.getAttribute('width'));
                    res = Math.max(res,cur);
                    break;
            }
        }
        return res;
    },
    getPrcsPos : (xmlDoc) => {
        let prcss = Array.from(xmlDoc.querySelectorAll('object'))
            .filter((n) => n.hasAttribute('dry') );
        let maxX = 0;
        let maxY = 160;
        for(let prcs of prcss){
            let mxGeometry = prcs.querySelector('mxCell mxGeometry');
            let x = Number(mxGeometry.getAttribute('x'));
            let y = Number(mxGeometry.getAttribute('y'));

            if( maxY < y ){
                maxY = y;
                maxX = 0;
            }
            maxX = Math.max(maxX,x);
        }
        return {maxX,maxY};
    },
    setClipboard : (data) => {
        let tempElem = document.createElement('textarea');
        tempElem.value = data;
        document.body.appendChild(tempElem);

        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);

    }

};

let gParser = {
    getLineLayout : (decryptedModel) => {
        let xmlDoc = mxUtils.parseXml(decryptedModel);
        //part type x, y 좌표 get
        let partTypes = gParser.getPartTypes(xmlDoc);
        //part type 안에 있는 material get
        let materials = gParser.getMaterials(xmlDoc);
        //material에 part Type 매칭
        gParser.updateMaterialWithPartType(partTypes,materials);
        //process 들만 뽑아서 y, x order by
        let prcss = gParser.getPrcss(xmlDoc);
        //process에 material 매칭
        gParser.updatePrcsWithMaterial(materials,prcss);

        return prcss;
    },
    getPartTypes : (xmlDoc) => {
        let partTypes = [];
        let tmpObj = Array.from(xmlDoc.querySelectorAll('object'))
            .filter((n) => n.getAttribute('type') === 'part_type' );

        for(let obj of tmpObj){
            let name = obj.getAttribute('label');
            let geo = obj.querySelector('mxCell mxGeometry');
            let width = Number(geo.getAttribute('width'));
            //let height = Number(geo.getAttribute('height'));
            let x = Number(geo.getAttribute('x'));
            let xEnd = x+width;
            //let y = Number(geo.getAttribute('y'));
            partTypes.push({name,x,xEnd});
        }
        partTypes.sort( (a,b) => a.x - b.x );
        return partTypes;
    },
    getMaterials : (xmlDoc) => {
        let materials = [];
        let tmpObj = Array.from(xmlDoc.querySelectorAll('object'))
            .filter((n) => n.getAttribute('type') === 'material' );
        for(let obj of tmpObj){
            let _part_id = obj.getAttribute('_part_id');
            let _mat_name = obj.getAttribute('_mat_name');
            let geo = obj.querySelector('mxCell mxGeometry');
            let width = Number(geo.getAttribute('width'));
            let x = Number(geo.getAttribute('x'));
            let xEnd = x+width;
            materials.push({_part_id,_mat_name,x,xEnd});
        }

        materials.sort( (a,b) => a.x - b.x);
        return materials;
    },
    getPartIds : (decryptedModel) => {
        let xmlDoc = mxUtils.parseXml(decryptedModel);
        let materials = gParser.getMaterials(xmlDoc);
        let res = [];
        for(let mtl of materials){
            res.push(mtl._part_id);
        }
        return res;
    },
    updateMaterialWithPartType : (partTypes, materials) => {
        let i = 0;
        for(let material of materials){
            for(i; i < partTypes.length; i++){
                if(partTypes[i].xEnd+10 >= material.xEnd){
                    material.partType = partTypes[i].name;
                    break;
                }
            }
        }
    },
    getPrcss: (xmlDoc) => {
        let prcss = [];
        let tmpObj = Array.from(xmlDoc.querySelectorAll('object'))
            .filter((n) => n.hasAttribute('dry') );
        for(let obj of tmpObj){
            let dry = obj.getAttribute('dry');
            let chamber = obj.getAttribute('chamber');  // Dry Image (Hot Air + NIR) or Dry Image (NIR) or Dry Image (Hot Air)
            chamber = gParser.getChamber(chamber);
            let child = obj.querySelector('mxCell');
            let geo = child.querySelector('mxGeometry');
            let _proc_name = '';
            if(obj.getAttribute('label')){ //Process 그룹화 안되어 있을 때 로직
                _proc_name = obj.getAttribute('label').split("\n")[0].trim();
            }else{ //Process 그룹화 되어 있을때 로직
                let children = xmlDoc.querySelectorAll('mxCell[parent="'+obj.id+'"]');
                if(children.length>0 && children[0].getAttribute('value'))
                    _proc_name = children[0].getAttribute('value').split("\n")[0].trim();
            }

            let width = Number(geo.getAttribute('width'));
            let height = Number(geo.getAttribute('height'));
            let x = Number(geo.getAttribute('x'));
            let xEnd = x+width;
            let y = Number(geo.getAttribute('y'));
            let yEnd = y+height;



            //prcss.push({dry,chamber,_proc_name,x,xEnd,y,yEnd, noUpdate});
            if(dry != 'no'){
                prcss.push({dry:'no',chamber:'no',_proc_name,x,xEnd,y,yEnd});
                prcss.push({dry:'yes',chamber,_proc_name:'Dry',x,xEnd,y,yEnd});
            }else{
                prcss.push({dry,chamber,_proc_name,x,xEnd,y,yEnd});
            }
        }
        prcss.sort( (a,b) => {
            if(a.y > b.y) return 1;
            if(a.y < b.y) return -1;
            return a.x-b.x;
        } );
        return prcss;
    },
    updatePrcsWithMaterial : (materials, prcss) => {
        for(let prcs of prcss){
            if(prcs.dry === 'yes'){
                prcs.partType = '';
                prcs._mat_name = '';
                prcs._part_id = '';
                continue;
            }
            for(let material of materials){
                if(material.xEnd+10 >= prcs.xEnd){
                    prcs.partType = material.partType;
                    prcs._mat_name = material._mat_name;
                    prcs._part_id = material._part_id;
                    break;
                }
            }
        }

        for(let prcs of prcss){
            delete prcs.x;
            delete prcs.xEnd;
            delete prcs.y;
            delete prcs.yEnd;
        }
    },
    getChamber : (chamber) => {
        let replaced = chamber.replace(/\s/gi, "").toLowerCase();
        if(replaced.includes('hotair') && replaced.includes('nir'))
            return 'Dry Image (Hot Air + NIR)'
        else if(replaced.includes('hotair'))
            return 'Dry Image (Hot Air)';
        else if(replaced.includes('nir'))
            return 'Dry Image (NIR)';
        else
            return 'no';
    }

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
    data: [ {id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"UPPER"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"UPPER"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"UPPER"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"UPPER"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"UPPER"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"UPPER"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"UPPER"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"UPPER"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"UPPER"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"UPPER"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"UPPER"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"UPPER"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"UPPER"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"UPPER"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"UPPER"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"UPPER"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"UPPER"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"UPPER"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"UPPER"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"UPPER"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"UPPER"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"UPPER"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"UPPER"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"UPPER"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"UPPER"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"UPPER"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"UPPER"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"UPPER"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"MIDSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"MIDSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"MIDSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"MIDSOLE"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"MIDSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"MIDSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"MIDSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"MIDSOLE"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"MIDSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"MIDSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"MIDSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"MIDSOLE"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"MIDSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"MIDSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"MIDSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"MIDSOLE"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"MIDSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"MIDSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"MIDSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"MIDSOLE"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"OUTSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"OUTSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"OUTSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"OUTSOLE"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"OUTSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"OUTSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"OUTSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"OUTSOLE"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"OUTSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"OUTSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"OUTSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"OUTSOLE"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"OUTSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"OUTSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"OUTSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"OUTSOLE"}
        ,{id: "D20C8B8FBBA246D19499B2170A930AF7", _mat_cd: "11121", _mat_name: "FIRM PU BACKING FOAM ( 2 MM )", _mcs_number: "", _part_name: "COLLAR LINING 1",_part_type:"OUTSOLE"}
        ,{id: "28DE192F781A4AB38F322E75C6E9C397", _mat_cd: "2136", _mat_name: "GENERIC Outer CARTON", _mcs_number: "", _part_name: "OUTER CARTON",_part_type:"OUTSOLE"}
        ,{id: "77574CA68734418EA3E9B2A492B58BA9", _mat_cd: "246467", _mat_name: "MOSNET MESH, REC", _mcs_number: "", _part_name: "TONGUE OLAY",_part_type:"OUTSOLE"}
        ,{id: "46F193D6426946D7BA6BB76CCBF59984", _mat_cd: "246348", _mat_name: "BEETLE SPACER V3 REC(DRT-2782)", _mcs_number: "", _part_name: "VAMP",_part_type:"OUTSOLE"}],

    loc: {
        x: 80,
        y: 160,
    },
    load: (mat,partNm,partType) => {
        let popMatContents = document.querySelector("#popMatContents");
        popMatContents.innerHTML = "";
        let tmp = document.querySelector("#matCard");
        let tempAr = popMat.data.filter((n) => {
            if(!mat && !partNm && !partType) return true;
            if(n._mat_name.toLowerCase().indexOf(mat.toLowerCase()) >=0
                && n._part_name.toLowerCase().indexOf(partNm.toLowerCase()) >=0
                && n._part_type.toLowerCase().indexOf(partType.toLowerCase()) >=0
            ) return true;

            return false;
        });
        for (let mat of tempAr) {
            tmp.content.querySelector('div[name="_part_type"]').id = mat.id;
            tmp.content.querySelector('div[name="_part_type"]').textContent =
                mat._part_type;
            tmp.content.querySelector('div[name="_mat_name"]').textContent =
                mat._mat_name;
            tmp.content.querySelector('div[name="_mat_cd"]').textContent =
                mat._mat_cd;
            tmp.content.querySelector('div[name="_part_name"]').textContent =
                mat._part_name;
            tmp.content.querySelector('div[name="_mcs_number"]').textContent =
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
        spinner.show();
        let xmlDoc = mxUtils.parseXml(gXml);
        let luMatParam = [];
        let matNames = [];
        for (let mat of document.querySelectorAll(
            "#popMatContents .card.select"
        )) {
            let _mat_cd = mat.querySelector('div[name="_mat_cd"]').textContent;
            let _mat_name = mat.querySelector('div[name="_mat_name"]')
                .textContent;
            let _mcs_number = mat.querySelector('div[name="_mcs_number"]')
                .textContent;
            let _part_id = mat.querySelector('div[name="_part_type"]').id;
            luMatParam.push(_mcs_number);
            matNames.push({_mcs_number,_mat_name});
            let mxObj = xmlDoc.createElement('object');
            mxObj.id = editor.getNewId(xmlDoc);
            mxObj.setAttribute("type","material");
            mxObj.setAttribute("_part_id",_part_id);
            mxObj.setAttribute("_mat_name",_mat_name);
            mxObj.setAttribute("label",`<b>${_mat_name}(#${_mat_cd})</b>`);

            let mxCell = xmlDoc.createElement("mxCell");
            mxCell.setAttribute(
                "style",
                "rounded=1;whiteSpace=wrap;html=1;arcSize=25;fillColor=#ffff99;strokeColor=none;"
            );
            mxCell.setAttribute("vertex", "1");
            mxCell.setAttribute("parent", "1");
            mxCell.innerHTML = `<mxGeometry x="${(popMat.loc.x += 150)}" y="${popMat.loc.y}" width="140" height="60" as="geometry"/>`;
            mxObj.appendChild(mxCell);
            xmlDoc.querySelector("root").appendChild(mxObj);
        }

        if(bondType == 'ZX_BPFC_Assembly')
            await popMat.addLuMatMxCell(luMatParam,matNames,xmlDoc);

        popMat.loc.x += 50;
        popMat.loc.y += 50;
        gXml = mxUtils.getXml(xmlDoc);
        iframe.contentWindow.postMessage(
            JSON.stringify({ action: "load", xml: gXml }),
            "*"
        );

        document.querySelector("#popMat").style.display = "none";
        document.querySelector("#popMatContents").innerHTML = "";
        spinner.hide();
    },
    onClickCancel: () => {
        document.querySelector("#popMatContents").innerHTML = "";
        document.querySelector("#popMat").style.display = "none";
    },
    addLuMatMxCell : async (luMatParam,matNames,xmlDoc)=>{
        let luMat = await popMat.retrieveLuMat(luMatParam, matNames);
        debugger;
        if(luMat !== ''){
            let mxCellLuMat = xmlDoc.createElement("mxCell");
            mxCellLuMat.id = editor.getNewId(xmlDoc);
            mxCellLuMat.setAttribute("value", luMat);
            mxCellLuMat.setAttribute('style','text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;');
            mxCellLuMat.setAttribute("vertex", "1");
            mxCellLuMat.setAttribute("parent", "1");
            mxCellLuMat.innerHTML = `<mxGeometry x="${editor.getPos(xmlDoc,'left')}" y="${editor.getPos(xmlDoc,'bottom')+10}" width="650" height="100"  as="geometry"/>`;
            xmlDoc.querySelector("root").appendChild(mxCellLuMat);
        }
    },
    retrieveLuMat: async (param, matNames) => {
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
            /*for(let key of Object.keys(json)){
                res = res + key + ' : ' + json[key]+'\n\n';
            }
            return res;*/
            for(let key of Object.keys(json)){
                for(let i = 0; i<matNames.length; i++){
                    if(key == matNames[i]._mcs_number){
                        res = res + matNames[i]._mat_name + '\n -' + json[key]+'\n\n';
                        continue;
                    }
                }
            }
            return res;
        } else {
            alert("HTTP-Error: " + response.status);
            return '';
        }
    },
    onSearch: () =>{
        let srchMat = document.querySelector('#popMat div input[name="srchMat"]').value;
        let srchPartNm = document.querySelector('#popMat div input[name="srchPartNm"]').value;
        let srchPartType = document.querySelector('#popMat div input[name="srchPartType"]').value;
        popMat.load(srchMat,srchPartNm,srchPartType);
    }
};

let popPrc = {

    data:[{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"Water washing","_chemical":"","_drawio_proc_name":"Water washing","_hrd":[],"_condition":["Min 45~50℃ x 10'↑"]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"Pre-Heating","_chemical":"","_drawio_proc_name":"Pre-Heating","_hrd":[],"_condition":["Min 45~50℃ x 1'30\"↑"]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"Henkel","_proc_name":"UV Primer P-7-2","_chemical":"","_drawio_proc_name":"UV Primer P-7-2","_hrd":[],"_condition":["45~50℃ x Min 1'30\""]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"Nan-Pao","_proc_name":"UV Primer UV-8N","_chemical":"","_drawio_proc_name":"UV Primer UV-8N","_hrd":[],"_condition":["45~50℃ x Min 1'30\""]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"UV Lighting ","_chemical":"","_drawio_proc_name":"UV Lighting ","_hrd":[],"_condition":["Light color MIN 0.56 J/㎠↑or \r\nDark color Min 0.52 J/㎠↑"]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"Packing","_chemical":"","_drawio_proc_name":"Packing","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"Bio-110M washing ","_chemical":"","_drawio_proc_name":"Bio-110M washing ","_hrd":[],"_condition":["(Bio-110M : Water=1:20, PH:10↑). 70~80℃x 45\" ↑"]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"1st water washing","_chemical":"","_drawio_proc_name":"1st water washing","_hrd":[],"_condition":["60~65℃x 35\" ↑"]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"2nd water washing","_chemical":"","_drawio_proc_name":"2nd water washing","_hrd":[],"_condition":["(Oxalic acid, pH: 2~5) 70~75℃x 35\" ↑"]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"Remove moisture with air","_chemical":"","_drawio_proc_name":"Remove moisture with air","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"Dry C/V","_chemical":"","_drawio_proc_name":"Dry C/V","_hrd":[],"_condition":[" 80℃x 2'30\"↑"]},{"_sheet":"ZX_BPFC_PreStockfit","_vendor":"","_proc_name":"2.5D Heat Press","_chemical":"","_drawio_proc_name":"2.5D Heat Press","_hrd":[],"_condition":["120±10℃ x 1.8㎏/㎠  x 3\"↑"]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han young","_proc_name":"Cleaner","_chemical":"2388M","_drawio_proc_name":"Cleaning 2388M","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nap-Pao","_proc_name":"Cleaner","_chemical":"256","_drawio_proc_name":"Cleaning 256","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Sam-Bu","_proc_name":"Cleaner","_chemical":"Bio E10-T","_drawio_proc_name":"♣ Cleaning E10-T","_hrd":["♣ ET-3 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Sam-Bu","_proc_name":"Cleaner","_chemical":"Bio S5","_drawio_proc_name":"Cleaning 5S","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233BF","_drawio_proc_name":"Cleaning 233BF","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233BFU","_drawio_proc_name":"Cleaning 233BFU","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233M","_drawio_proc_name":"Cleaning 233M","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233SM","_drawio_proc_name":"Cleaning 233SM","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  PC-3","_drawio_proc_name":"Cleaning PC-3","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nap-Pao","_proc_name":"Cleaner","_chemical":"No. 29","_drawio_proc_name":"Cleaning No. 29","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nap-Pao","_proc_name":"Cleaner","_chemical":"No. 29(CN)","_drawio_proc_name":"Cleaning No. 29(CN)","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"BONDACE 005S","_drawio_proc_name":"Primer 005S","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"BONDACE 007","_drawio_proc_name":"☆ Primer 007","_hrd":["☆ Powder : 2% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"BONDACE 008-2","_drawio_proc_name":"Primer 008-2","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"BONDACE 171-2","_drawio_proc_name":"※ Primer 171-2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"BONDACE 207","_drawio_proc_name":"☆ Primer 007","_hrd":["☆ Powder : 2% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"BONDACE 218-2","_drawio_proc_name":"Primer 218-2","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"BONDACE 224-2","_drawio_proc_name":"※ Primer 224-2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"BONDACE 232HF-2","_drawio_proc_name":"※ Primer 232HF-2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"BONDACE 234F-2","_drawio_proc_name":"※ Primer 234F-2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"AQUACE PR-651","_drawio_proc_name":"★ Primer PR-651","_hrd":["★ ARF-45 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"AQUACE PR-505","_drawio_proc_name":"☆ Primer PR-505","_hrd":["☆ Powder : 2% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"AQUACE PR-505 V2","_drawio_proc_name":"☆ Primer PR-505 V2","_hrd":["☆ Powder : 2% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"AQUACE SW 7001","_drawio_proc_name":"Primer SW 7001","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"AQUACE SW-3001","_drawio_proc_name":"Primer SW 3001","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"AQUACE W-102","_drawio_proc_name":"★ Primer W-102","_hrd":["★ ARF-40 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"AQUACE W-104","_drawio_proc_name":"★ Primer W-104","_hrd":["★ ARF-40 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Primer","_chemical":"AQUACE W-105","_drawio_proc_name":"★ Primer W-105","_hrd":["★ ARF-40 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"BONDACE 5100U-2","_drawio_proc_name":"※ Cement 5100U-2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"BONDACE 5100UL-2","_drawio_proc_name":"※ Cement 5100UL-2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"BONDACE 5100H-2","_drawio_proc_name":"※ Cement 5100H-2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"BONDACE 5100UL-2 V2","_drawio_proc_name":"※ Cement 5100UL-2 V2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"BONDACE 5100UL-2 V2L","_drawio_proc_name":"※ Cement 5100UL-2 V2L","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"BONDACE 6100U-2","_drawio_proc_name":"※ Cement 6100U-2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"BONDACE 6100UL-2","_drawio_proc_name":"※ Cement 6100UL-2","_hrd":["※ DRFE : 5% ADDITION","※ RFE : 5% ADDITION","※ ARF-1000 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"C 325","_drawio_proc_name":"Cement C 325","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"C 325H","_drawio_proc_name":"Cement C 325H","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"C 326","_drawio_proc_name":"Cement C 326","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"C 310","_drawio_proc_name":"Cement C 310","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"AQUACE SW-07","_drawio_proc_name":"Cement SW-07","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"AQUACE SW-30","_drawio_proc_name":"Cement SW-30","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"W-01","_drawio_proc_name":"★ Cement W-01","_hrd":["★ ARF-40 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cement","_chemical":"W-50","_drawio_proc_name":"★ Cement W-50","_hrd":["★ ARF-40 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han young","_proc_name":"Cleaner","_chemical":"2388M","_drawio_proc_name":"Cleaning 2388M","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nap-Pao","_proc_name":"Cleaner","_chemical":"256","_drawio_proc_name":"Cleaning 256","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Sam-Bu","_proc_name":"Cleaner","_chemical":"Bio E10-T","_drawio_proc_name":"♣ Cleaning E10-T","_hrd":["♣ ET-3 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Sam-Bu","_proc_name":"Cleaner","_chemical":"Bio S5","_drawio_proc_name":"Cleaning 5S","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233BF","_drawio_proc_name":"Cleaning 233BF","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233BFU","_drawio_proc_name":"Cleaning 233BFU","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233M","_drawio_proc_name":"Cleaning 233M","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233SM","_drawio_proc_name":"Cleaning 233SM","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  PC-3","_drawio_proc_name":"Cleaning PC-3","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nap-Pao","_proc_name":"Cleaner","_chemical":"No. 29","_drawio_proc_name":"Cleaning No. 29","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nap-Pao","_proc_name":"Cleaner","_chemical":"No. 29(CN)","_drawio_proc_name":"Cleaning No. 29(CN)","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"1015F","_drawio_proc_name":"☆ Primer 1015F","_hrd":["☆ Powder : 2% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"1016AB","_drawio_proc_name":"☆ Primer 1016AB","_hrd":["☆ Powder : 2% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"1024","_drawio_proc_name":"※ Primer 1024","_hrd":["※ 1071 : 5% ADDITION","※ H143 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"111FT","_drawio_proc_name":"※ Primer 111FT","_hrd":["※ 1071 : 4% ADDITION","※ H143 : 4% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"111GN","_drawio_proc_name":"※ Primer 111GN","_hrd":["※ H143 : 4% ADDITION","※ 1071 : 4% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"122KN","_drawio_proc_name":"※ Primer 122KN","_hrd":["※ H143 : 5% ADDITION","※ 1071 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"2015K","_drawio_proc_name":"☆ Primer 2015K","_hrd":["☆ Powder : 2% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"P-132 ","_drawio_proc_name":"※ Primer P-132","_hrd":["※ H143 : 3% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"UE-8SF","_drawio_proc_name":"★ Primer UE-8SF","_hrd":["★ CL-16 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"UE-311","_drawio_proc_name":"★ Primer UE-311","_hrd":["★ CL-16 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Primer","_chemical":"UE-312L","_drawio_proc_name":"★ Primer UE-312L","_hrd":["★ CL-16 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Cement","_chemical":"71KMN","_drawio_proc_name":"※ Cement 71KMN","_hrd":["※ 1071 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Cement","_chemical":"71KMN V2","_drawio_proc_name":"※ Cement 71KMN V2","_hrd":["※ 1071 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Cement","_chemical":"NP-500","_drawio_proc_name":"Cement NP-500","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Cement","_chemical":"NP-500H","_drawio_proc_name":"Cement NP-500H","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Cement","_chemical":"NP-500L","_drawio_proc_name":"Cement NP-500L","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Cement","_chemical":"NP-200","_drawio_proc_name":"Cement NP-200","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Cement","_chemical":"NP-600","_drawio_proc_name":"Cement NP-600","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Cement","_chemical":"NP-99","_drawio_proc_name":"★ Cement NP-99","_hrd":["★ CL-16 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nan-Pao","_proc_name":"Cement","_chemical":"WP-505","_drawio_proc_name":"★ Cement WP-505","_hrd":["★ CL-16 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han young","_proc_name":"Cleaner","_chemical":"2388M","_drawio_proc_name":"Cleaning 2388M","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nap-Pao","_proc_name":"Cleaner","_chemical":"256","_drawio_proc_name":"Cleaning 256","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Sam-Bu","_proc_name":"Cleaner","_chemical":"Bio E10-T","_drawio_proc_name":"♣ Cleaning E10-T","_hrd":["♣ ET-3 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Sam-Bu","_proc_name":"Cleaner","_chemical":"Bio S5","_drawio_proc_name":"Cleaning 5S","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233BF","_drawio_proc_name":"Cleaning 233BF","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233BFU","_drawio_proc_name":"Cleaning 233BFU","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233M","_drawio_proc_name":"Cleaning 233M","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  233SM","_drawio_proc_name":"Cleaning 233SM","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Henkel","_proc_name":"Cleaner","_chemical":"BONDACE  PC-3","_drawio_proc_name":"Cleaning PC-3","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nap-Pao","_proc_name":"Cleaner","_chemical":"No. 29","_drawio_proc_name":"Cleaning No. 29","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Nap-Pao","_proc_name":"Cleaner","_chemical":"No. 29(CN)","_drawio_proc_name":"Cleaning No. 29(CN)","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"TU-508P","_drawio_proc_name":"※ Primer TU-508P","_hrd":["※ DRFE : 5% ADDITION","※ H-RFE : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"TU-103TF","_drawio_proc_name":"※ Primer TU-103TF","_hrd":["※ DRFE : 5% ADDITION","※ H-RFE : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"TU-106TF","_drawio_proc_name":"※ Primer TU-106TF","_hrd":["※ DRFE : 5% ADDITION","※ H-RFE : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"TU-107","_drawio_proc_name":"☆ Primer TU-107","_hrd":["☆ Powder : 2% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"TU-1205TF","_drawio_proc_name":"※ Primer TU-1205TF","_hrd":["※ DRFE : 5% ADDITION","※ H-RFE : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"WP1-116","_drawio_proc_name":"Primer WP1-116","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"WPM-707","_drawio_proc_name":"☆ Primer WPM-707","_hrd":["☆ Powder : 2% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"WTU-116K","_drawio_proc_name":"★ Primer WTU-116K","_hrd":["★ HW-005 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"WTU-116","_drawio_proc_name":"★ Primer WTU-116","_hrd":["★ HW-005 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Primer","_chemical":"WTU-116S","_drawio_proc_name":"★ Primer WTU-116S","_hrd":["★ HW-005 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Cement","_chemical":"HA-510TF","_drawio_proc_name":"※ Cement HA-510TF","_hrd":["※ DRFE : 5% ADDITION","※ H-RFE : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Cement","_chemical":"KW-100A","_drawio_proc_name":"★ Cement KW-100A","_hrd":["★ HW-005 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Cement","_chemical":"KW-300S","_drawio_proc_name":"★ Cement KW-300S","_hrd":["★ HW-005 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Cement","_chemical":"KW-700A","_drawio_proc_name":"★ Cement KW-700A","_hrd":["★ HW-005 : 5% ADDITION"],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Cement","_chemical":"WA-03","_drawio_proc_name":"Cement WA-03","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Cement","_chemical":"WA-03S","_drawio_proc_name":"Cement WA-03S","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"Han-Young","_proc_name":"Cement","_chemical":"WA-1C","_drawio_proc_name":"Cement WA-1C","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Re-Heating","_chemical":"","_drawio_proc_name":"Re-Heating","_hrd":[],"_condition":["45~50℃ x 2'15\"","50~55℃ x 2'15\""]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Re-Heating","_chemical":"","_drawio_proc_name":"","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Pre-Heating ","_chemical":"","_drawio_proc_name":"Pre-Heating ","_hrd":[],"_condition":["45~50℃ x 2'15\"","50~55℃ x 2'15\""]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Pre-Heating ","_chemical":"","_drawio_proc_name":"","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Dry","_chemical":"","_drawio_proc_name":"Dry","_hrd":[],"_condition":["45~50℃ x 2'15\"","48~53℃ x 2'15\"","50~55℃ x 2'15\"","50~60℃ x 2'15\""]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Wipe rubber surface with water (Clear Rubber only)","_chemical":"","_drawio_proc_name":"Wipe rubber surface with water (Clear Rubber only)","_hrd":[],"_condition":["50~60℃ x 2'15\"","50~55℃ x 2'15\""]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Wipe rubber surface with water (Clear Rubber only)","_chemical":"","_drawio_proc_name":"","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Buffing & Air cleaning","_chemical":"","_drawio_proc_name":"Buffing & Air cleaning","_hrd":[],"_condition":["sand paper #40","sand paper #60","sand paper #80","sand paper #320"]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Transfer to Spraying line","_chemical":"","_drawio_proc_name":"Transfer to Spraying line","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Thomson Cutting","_chemical":"","_drawio_proc_name":"Thomson Cutting","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Packing","_chemical":"","_drawio_proc_name":"Packing","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Marking","_chemical":"","_drawio_proc_name":"Marking","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Holding time 2hrs","_chemical":"","_drawio_proc_name":"Holding time 2hrs","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Gauge Marking","_chemical":"","_drawio_proc_name":"Gauge Marking","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Airbag gauge marking","_chemical":"","_drawio_proc_name":"Airbag gauge marking","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Cutting","_chemical":"","_drawio_proc_name":"Cutting","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Attaching & Pressing by hand tool","_chemical":"","_drawio_proc_name":"Attaching & Pressing by hand tool","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Airbag L/R Marking","_chemical":"","_drawio_proc_name":"Airbag L/R Marking","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Air Blowing Off Buffing Partcle","_chemical":"","_drawio_proc_name":"Air Blowing Off Buffing Partcle","_hrd":[],"_condition":[]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"PASANGQUI Press","_chemical":"","_drawio_proc_name":"PASANGQUI Press","_hrd":[],"_condition":["6~7㎏/㎠↑ × 15\"↑"]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"MULTI Press","_chemical":"","_drawio_proc_name":"MULTI Press","_hrd":[],"_condition":["20㎏/㎠ ↑ × 8\"↑","25㎏/㎠ ↑ × 8\"↑"]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"DEEPWELL Press","_chemical":"","_drawio_proc_name":"DEEPWELL Press","_hrd":[],"_condition":["30㎏/㎠ ↑ × 8\"↑","30㎏/㎠ ↑ × 10\"↑","40㎏/㎠ ↑ × 8\"↑","40㎏/㎠ ↑ × 10\"↑"]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Top Bottom Press","_chemical":"","_drawio_proc_name":"Top Bottom Press","_hrd":[],"_condition":["30㎏/㎠ ↑ × 8\"↑","30㎏/㎠ ↑ × 10\"↑","40㎏/㎠ ↑ × 8\"↑","40㎏/㎠ ↑ × 10\"↑"]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Toe heel press","_chemical":"","_drawio_proc_name":"Toe heel press","_hrd":[],"_condition":["30㎏/㎠ ↑ × 10\"↑"]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Side press","_chemical":"","_drawio_proc_name":"Side press","_hrd":[],"_condition":["20㎏/㎠ ↑ × 10\"↑","30㎏/㎠ ↑ × 10\"↑"]},{"_sheet":"ZX_BPFC_Assembly,ZX_BPFC_Stockfit","_vendor":"","_proc_name":"Fist Press","_chemical":"","_drawio_proc_name":"Fist Press","_hrd":[],"_condition":["30~35㎏/㎠ × 1~2\""]},{"_sheet":"","_vendor":"","_proc_name":"","_chemical":"","_drawio_proc_name":"","_hrd":[],"_condition":[]}],
    /*data: [{id: "002A9F9760024C95BC38E65F174C3862", _proc_name: "Cement", _chemical: "SW-07"}
        ,{id: "078E5CAC43AB47ABBF455A8F98416E8C", _proc_name: "Cement", _chemical: "6300U-2"}
    ],*/
    loc: {
        x: 230,
        y: 240,
    },
    load: (prc,chem,vdr) => {
        let popContents = document.querySelector("#popPrcContents");
        popContents.innerHTML = "";
        let tmp = document.querySelector("#prcCard");
        let tempAr = popPrc.data.filter((n) => {
            if(!prc && !chem && !vdr) return true;
            if(n._proc_name.toLowerCase().indexOf(prc.toLowerCase()) >=0
                && n._chemical.toLowerCase().indexOf(chem.toLowerCase()) >=0
                && n._vendor.toLowerCase().indexOf(vdr.toLowerCase()) >=0) return true;
            else return false;
        });
        for (let data of tempAr) {
            tmp.content.querySelector('div[name="_proc_name"').setAttribute('raw',JSON.stringify(data));
            tmp.content.querySelector('div[name="_proc_name"').textContent =
                data._drawio_proc_name;
            tmp.content.querySelector('div[name="_vendor"').textContent =
                data._vendor;

            popPrc.loadCondition(tmp, data);
            popPrc.loadHardener(tmp, data);

            let clone = tmp.content.cloneNode(true);
            popContents.appendChild(clone);
        }
    },
    loadCondition: (tmp, data) =>{
        if(data._condition.length == 0) {
            tmp.content.querySelector('div[name="_condition_title"]').style.display = 'none';
            tmp.content.querySelector('input[name="_condition"]').style.display = 'none';
            tmp.content.querySelector('select[name="_condition"]').style.display = 'none';
        }else if(data._condition.length == 1){
            tmp.content.querySelector('input[name="_condition"]').value = data._condition[0];
            tmp.content.querySelector('div[name="_condition_title"]').style.display = 'inline-block';
            tmp.content.querySelector('input[name="_condition"]').style.display = '';
            tmp.content.querySelector('select[name="_condition"]').style.display = 'none';
        }else{
            tmp.content.querySelector('input[name="_condition"]').value = data._condition[0];
            tmp.content.querySelector('div[name="_condition_title"]').style.display = 'inline-block';
            tmp.content.querySelector('input[name="_condition"]').style.display = '';
            tmp.content.querySelector('select[name="_condition"]').style.display = '';
        }
        tmp.content.querySelector('select[name="_condition"]').innerHTML = '';
        for(let condition of data._condition){
            let option = document.createElement('option');
            option.innerText = condition;
            tmp.content.querySelector('select[name="_condition"]').appendChild(option);
        }
    },
    loadHardener: (tmp, data) =>{
        if(data._hrd.length == 0){
            tmp.content.querySelector('div[name="_hrd_title"]').style.display = 'none';
            tmp.content.querySelector('input[name="_hrd"]').style.display = 'none';
            tmp.content.querySelector('select[name="_hrd"]').style.display = 'none';
        }else if(data._hrd.length == 1){
            tmp.content.querySelector('input[name="_hrd"]').value = data._hrd[0];
            tmp.content.querySelector('div[name="_hrd_title"]').style.display = 'inline-block';
            tmp.content.querySelector('input[name="_hrd"]').style.display = '';
            tmp.content.querySelector('select[name="_hrd"]').style.display = 'none';
        }else{
            tmp.content.querySelector('input[name="_hrd"]').value = data._hrd[0];
            tmp.content.querySelector('div[name="_hrd_title"]').style.display = 'inline-block';
            tmp.content.querySelector('input[name="_hrd"]').style.display = '';
            tmp.content.querySelector('select[name="_hrd"]').style.display = '';
        }
        tmp.content.querySelector('select[name="_hrd"]').innerHTML = '';
        for(let hrd of data._hrd){
            let option = document.createElement('option');
            option.innerText = hrd;
            tmp.content.querySelector('select[name="_hrd"]').appendChild(option);
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
        let maxPos = editor.getPrcsPos(xmlDoc);
        popPrc.loc.x = 230;
        popPrc.loc.y = maxPos.maxY + 80;

        for (let elem of document.querySelectorAll(
            "#popPrcContents .card.select"
        )) {
            try{
                let _proc_name = elem.querySelector('div[name="_proc_name"]')
                    .textContent;
                let _chemical = elem.querySelector('div[name="_chemical"]')
                    .textContent;
                let _brush = elem.querySelector('input[name="_brush"]').value;
                let _tmpr = elem.querySelector('input[name="_tmpr"]').value;

                let mxObj = xmlDoc.createElement('object');
                mxObj.id = editor.getNewId(xmlDoc);
                mxObj.setAttribute("dry","no");
                mxObj.setAttribute("chamber","no");
                mxObj.setAttribute("label",`${_proc_name} ${_chemical} \n${_tmpr==''?'':'('+_tmpr+')'}`);
                xmlDoc.querySelector("root").appendChild(mxObj);

                let mxCell = xmlDoc.createElement("mxCell");
                mxCell.id = editor.getNewId(xmlDoc);
                mxCell.setAttribute("style", "rounded=0;whiteSpace=wrap;html=1;");
                mxCell.setAttribute("vertex", "1");
                mxCell.setAttribute("parent", "1");
                mxCell.innerHTML = `<mxGeometry x="${(popPrc.loc.x)}" y="${popPrc.loc.y}" width="140" height="60" as="geometry"/>`;
                mxObj.appendChild(mxCell);


                let mxCellBrush = xmlDoc.createElement("mxCell");
                mxCellBrush.id = editor.getNewId(xmlDoc);
                mxCellBrush.setAttribute("value", _brush);
                mxCellBrush.setAttribute("vertex", "1");
                mxCellBrush.setAttribute("parent", "1");
                mxCellBrush.innerHTML = `<mxGeometry x="${(popPrc.loc.x)}" y="${popPrc.loc.y}" width="20" height="20" as="geometry"/>`;
                popPrc.loc.x += 150;
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
            }catch(e){
                alert(elem.querySelector('div[name="_proc_name"]') + 'data error');
            }

        };

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
        let srchVdr = document.querySelector('#popPrc div input[name="srchVdr"]').value;
        popPrc.load(srchPrc,srchChem,srchVdr);
    }
};


