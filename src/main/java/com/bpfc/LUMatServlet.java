package com.bpfc;


import com.Global;
import com.google.gson.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation ExportProxyServlet
 */
@SuppressWarnings("serial")
public class LUMatServlet extends HttpServlet
{
    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response) throws ServletException, IOException
    {
        BufferedReader bf = request.getReader();

        if(bf == null){
            PrintWriter writer = response.getWriter();
            writer.print("{}");
        }

        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(bf);

        String[] keyword = {"","","",""};
        for(int i = 0; i<element.getAsJsonArray().size(); i++){
            String key = element.getAsJsonArray().get(i).getAsString();
            if(key.isEmpty() || "NULL".equals(key) || "N/A".equals(key))
                continue;
            keyword[i] = key;
        }
        if(keyword[0].length() + keyword[1].length() + keyword[2].length() + keyword[3].length() == 0){
            PrintWriter writer = response.getWriter();
            writer.print("{}");
            return;
        }

        try{
            String[] call1 = call();
            String jsalt = call1[0];
            String cookie = call1[1];
            String cookie2 = call2(jsalt,cookie);
            StringBuffer formData = call3(cookie2,keyword);
            HashMap<String,String> res = call4(formData,cookie2);
            Gson gson = new GsonBuilder().create();
            String json = gson.toJson(res);
            PrintWriter writer = response.getWriter();
            writer.print(json);
        }catch(Exception ex){
            PrintWriter writer = response.getWriter();
            writer.print("{}");
        }

    }

    private String[] call() throws Exception{
        String jsalt = "";
        String cookie = "";
        URL url = new URL("https://www.nikeconnect.com/irj/portal");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(8000);
        conn.setReadTimeout(8000);
        //conn.setInstanceFollowRedirects(false);
        conn.setRequestProperty("Accept", "*/*");
        conn.setRequestProperty("Connection", "keep-alive");
        conn.setRequestProperty("Host", "www.nikeconnect.com");
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0");


        for (Map.Entry<String, List<String>> header : conn.getHeaderFields().entrySet()) {
            for (String value : header.getValue()) {
                if("Set-Cookie".equals(header.getKey())){
                    cookie = cookie + value+";";
                }
                //System.out.println(header.getKey() + " :" + value);
            }
        }

        // 응답 내용(BODY) 구하기
        try (InputStream in = conn.getInputStream();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            byte[] buf = new byte[1024 * 8];
            int length = 0;
            while ((length = in.read(buf)) != -1) {
                out.write(buf, 0, length);
            }
            String output = new String(out.toByteArray(), "UTF-8");

            Document doc = Jsoup.parse(output);
            jsalt = doc.select("input[name=j_salt]").val();
            // System.out.println(jsalt);
            //System.out.println(cookie);

        }

        // 접속 해제
        conn.disconnect();
        return new String[]{jsalt,cookie};
    }

    private String call2(String jsalt, String cookie) throws Exception{
        String cookie2 = "";
        String id = Global.nkConnId;
        String pw = Global.nkConnPw;
        URL url = new URL("https://www.nikeconnect.com/irj/portal");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        StringBuffer buffer = new StringBuffer();
        buffer.append("login_submit").append("=").append("on").append("&");
        buffer.append("login_do_redirect").append("=").append("1").append("&");
        buffer.append("no_cert_storing").append("=").append("on").append("&");
        buffer.append("j_salt").append("=").append(jsalt).append("&");
        buffer.append("j_username").append("=").append(id).append("&");
        buffer.append("j_password").append("=").append(pw).append("&");
        buffer.append("uidPasswordLogon").append("=").append("로그온");

        String param = buffer.toString();
        byte[] postData = param.getBytes( StandardCharsets.UTF_8 );

        conn.setRequestMethod("POST");
        conn.setDefaultUseCaches(false);
        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setInstanceFollowRedirects(false);
        conn.setConnectTimeout(8000);
        conn.setReadTimeout(8000);

        conn.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
        conn.setRequestProperty("Host","www.nikeconnect.com");
        conn.setRequestProperty("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0");
        conn.setRequestProperty("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
        conn.setRequestProperty("Accept-Language","ko-KR,en-US;q=0.7,en;q=0.3");
        conn.setRequestProperty("Accept-Encoding","gzip, deflate, br");
        conn.setRequestProperty("Origin","https://www.nikeconnect.com");
        conn.setRequestProperty("Connection","keep-alive");
        conn.setRequestProperty("Referer","https://www.nikeconnect.com/irj/portal");
        conn.setRequestProperty("Upgrade-Insecure-Requests","1");
        conn.setRequestProperty("Pragma","no-cache");
        conn.setRequestProperty("Cache-Control","no-cache");
        conn.setRequestProperty("Cookie", cookie);
        conn.setRequestProperty("Content-Length", Integer.toString(postData.length ));

        // 서버로 전송
        try(DataOutputStream wr = new DataOutputStream(conn.getOutputStream())) {
            wr.write( postData );
            wr.flush();
        }

        for (Map.Entry<String, List<String>> header : conn.getHeaderFields().entrySet()) {
            for (String value : header.getValue()) {
                if("Set-Cookie".equals(header.getKey())){
                    cookie2 = cookie2 + value+";";
                }
            }
        }

        // 응답 내용(BODY) 구하기
        try (InputStream in = conn.getInputStream();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            byte[] buf = new byte[1024 * 8];
            int length = 0;
            while ((length = in.read(buf)) != -1) {
                out.write(buf, 0, length);
            }
            String output = new String(out.toByteArray(), "UTF-8");
        }

        // 접속 해제
        conn.disconnect();
        return cookie2;
    }

    private StringBuffer call3( String cookie, String[] keyword) throws Exception{
        URL url = new URL("https://www.nikeconnect.com/Asia.CHN.Guangzhou.LTM_SSL/FWMCS_List_LTM.aspx");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(8000);
        conn.setReadTimeout(8000);
        conn.setRequestProperty("Cookie", cookie);
        conn.setRequestProperty("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0");
        conn.setRequestProperty("Accept", "*/*");
        conn.setRequestProperty("Accept-Encoding", "identity");
        conn.setRequestProperty("Connection", "keep-alive");
        conn.setRequestProperty("Host","www.nikeconnect.com");
        conn.setInstanceFollowRedirects(false);
        conn.setRequestProperty("Accept-Language", "ko-KR,en-US;q=0.7,en;q=0.3");
        conn.setRequestProperty("Referer", "https://www.nikeconnect.com/Asia.CHN.Guangzhou.LTM_SSL/FWMain_LTM.aspx");
        conn.setRequestProperty("Upgrade-Insecure-Requests", "1");
        conn.setRequestProperty("Pragma","no-cache");
        conn.setRequestProperty("Cache-Control","no-cache");
        /*
        for (Map.Entry<String, List<String>> header : conn.getHeaderFields().entrySet()) {
            for (String value : header.getValue()) {
                //System.out.println(header.getKey()+" : " + value);
            }
        }*/
        //System.out.println(cookie);

        // 응답 내용(BODY) 구하기
        int responseCode = conn.getResponseCode();
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        // print result
        //System.out.println("HTTP 응답 코드 : " + responseCode);
        //System.out.println("HTTP body : " + response.toString());
        Document doc = Jsoup.parse(response.toString());
        String ucFilter_ToolkitScriptManager1_HiddenField = ";;AjaxControlToolkit, Version=3.5.50401.0, Culture=neutral, PublicKeyToken=28f01b0e84b6d53e:en-US:beac0bd6-6280-4a04-80bd-83d08f77c177:f9cec9bc:de1feab2:f2c8e708:720a52bf:589eaa30:698129cf:d9d4bb33";
        String __EVENTTARGET = doc.select("input[name=__EVENTTARGET]").val();
        String __EVENTARGUMENT = doc.select("input[name=__EVENTARGUMENT]").val();
        String __LASTFOCUS = doc.select("input[name=__LASTFOCUS]").val();
        String __VIEWSTATE = doc.select("input[name=__VIEWSTATE]").val();
        String __VIEWSTATEGENERATOR = doc.select("input[name=__VIEWSTATEGENERATOR]").val();
        String __EVENTVALIDATION = doc.select("input[name=__EVENTVALIDATION]").val();

        StringBuffer buffer = new StringBuffer();
        buffer.append("ucFilter_ToolkitScriptManager1_HiddenField").append("=").append(URLEncoder.encode(ucFilter_ToolkitScriptManager1_HiddenField, StandardCharsets.UTF_8)).append("&");
        buffer.append("__EVENTTARGET").append("=").append(URLEncoder.encode(__EVENTTARGET,StandardCharsets.UTF_8)).append("&");
        buffer.append("__EVENTARGUMENT").append("=").append(URLEncoder.encode(__EVENTARGUMENT,StandardCharsets.UTF_8)).append("&");
        buffer.append("__LASTFOCUS").append("=").append(URLEncoder.encode(__LASTFOCUS,StandardCharsets.UTF_8)).append("&");
        buffer.append("__VIEWSTATE").append("=").append(URLEncoder.encode(__VIEWSTATE,StandardCharsets.UTF_8)).append("&");
        buffer.append("__VIEWSTATEGENERATOR").append("=").append(URLEncoder.encode(__VIEWSTATEGENERATOR,StandardCharsets.UTF_8)).append("&");
        buffer.append("__EVENTVALIDATION").append("=").append(URLEncoder.encode(__EVENTVALIDATION,StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$dd1Row1Field").append("=").append("1").append("&");
        buffer.append("ucFilter$dd1Row1Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb1Row1$TextBox").append("=").append(URLEncoder.encode(keyword[0],StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb1Row1$HiddenField").append("=").append("-2").append("&");
        buffer.append("ucFilter$dd1Row2Field").append("=").append("2").append("&");
        buffer.append("ucFilter$dd1Row2Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb1Row2$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb1Row2$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd1Row3Field").append("=").append("3").append("&");
        buffer.append("ucFilter$dd1Row3Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb1Row3$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb1Row3$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd1Row4Field").append("=").append("4").append("&");
        buffer.append("ucFilter$dd1Row4Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb1Row4$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb1Row4$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd1Row5Field").append("=").append("5").append("&");
        buffer.append("ucFilter$dd1Row5Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb1Row5$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb1Row5$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd1Row6Field").append("=").append("6").append("&");
        buffer.append("ucFilter$dd1Row6Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb1Row6$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb1Row6$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd2Row1Field").append("=").append("1").append("&");
        buffer.append("ucFilter$dd2Row1Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb2Row1$TextBox").append("=").append(URLEncoder.encode(keyword[1],StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb2Row1$HiddenField").append("=").append("-2").append("&");
        buffer.append("ucFilter$dd2Row2Field").append("=").append("2").append("&");
        buffer.append("ucFilter$dd2Row2Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb2Row2$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb2Row2$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd2Row3Field").append("=").append("3").append("&");
        buffer.append("ucFilter$dd2Row3Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb2Row3$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb2Row3$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd2Row4Field").append("=").append("4").append("&");
        buffer.append("ucFilter$dd2Row4Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb2Row4$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb2Row4$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd2Row5Field").append("=").append("5").append("&");
        buffer.append("ucFilter$dd2Row5Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb2Row5$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb2Row5$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd2Row6Field").append("=").append("6").append("&");
        buffer.append("ucFilter$dd2Row6Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb2Row6$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb2Row6$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$lbtnAdvancedSearch").append("=").append("Search").append("&");
        buffer.append("ucFilter$dd3Row1Field").append("=").append("1").append("&");
        buffer.append("ucFilter$dd3Row1Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb3Row1$TextBox").append("=").append(URLEncoder.encode(keyword[2],StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb3Row1$HiddenField").append("=").append("-2").append("&");
        buffer.append("ucFilter$dd3Row2Field").append("=").append("2").append("&");
        buffer.append("ucFilter$dd3Row2Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb3Row2$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb3Row2$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd3Row3Field").append("=").append("3").append("&");
        buffer.append("ucFilter$dd3Row3Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb3Row3$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb3Row3$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd3Row4Field").append("=").append("4").append("&");
        buffer.append("ucFilter$dd3Row4Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb3Row4$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb3Row4$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd3Row5Field").append("=").append("5").append("&");
        buffer.append("ucFilter$dd3Row5Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb3Row5$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb3Row5$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd3Row6Field").append("=").append("6").append("&");
        buffer.append("ucFilter$dd3Row6Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb3Row6$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb3Row6$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd4Row1Field").append("=").append("1").append("&");
        buffer.append("ucFilter$dd4Row1Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb4Row1$TextBox").append("=").append(URLEncoder.encode(keyword[3],StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb4Row1$HiddenField").append("=").append("-2").append("&");
        buffer.append("ucFilter$dd4Row2Field").append("=").append("2").append("&");
        buffer.append("ucFilter$dd4Row2Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb4Row2$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb4Row2$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd4Row3Field").append("=").append("3").append("&");
        buffer.append("ucFilter$dd4Row3Operator").append("=").append(URLEncoder.encode("=", StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb4Row3$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb4Row3$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd4Row4Field").append("=").append("4").append("&");
        buffer.append("ucFilter$dd4Row4Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb4Row4$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb4Row4$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd4Row5Field").append("=").append("5").append("&");
        buffer.append("ucFilter$dd4Row5Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb4Row5$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb4Row5$HiddenField").append("=").append("0").append("&");
        buffer.append("ucFilter$dd4Row6Field").append("=").append("6").append("&");
        buffer.append("ucFilter$dd4Row6Operator").append("=").append(URLEncoder.encode("=",StandardCharsets.UTF_8)).append("&");
        buffer.append("ucFilter$cb4Row6$TextBox").append("=").append("").append("&");
        buffer.append("ucFilter$cb4Row6$HiddenField").append("=").append("0");

        // 접속 해제
        conn.disconnect();

        return buffer;
    }


    private HashMap<String,String> call4(StringBuffer buffer, String cookie) throws Exception{
        HashMap<String,String> res = new HashMap<>();
        URL url = new URL("https://www.nikeconnect.com/Asia.CHN.Guangzhou.LTM_SSL/FWMCS_List_LTM.aspx");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        String param = buffer.toString();
        byte[] postData = param.getBytes( StandardCharsets.UTF_8 );

        conn.setRequestMethod("POST");
        conn.setDefaultUseCaches(false);
        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setInstanceFollowRedirects(false);
        conn.setConnectTimeout(8000);
        conn.setReadTimeout(8000);

        conn.setRequestProperty("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
        conn.setRequestProperty("Accept-Language","ko,en-US;q=0.9,en;q=0.8,ko-KR;q=0.7");
        conn.setRequestProperty("Accept-Encoding","identity");
        conn.setRequestProperty("Connection","keep-alive");
        conn.setRequestProperty("Content-Length", Integer.toString(postData.length ));
        conn.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
        conn.setRequestProperty("Cookie", cookie);
        conn.setRequestProperty("Host","www.nikeconnect.com");
        conn.setRequestProperty("Origin","https://www.nikeconnect.com");
        conn.setRequestProperty("Referer","https://www.nikeconnect.com/Asia.CHN.Guangzhou.LTM_SSL/FWMCS_List_LTM.aspx");
        conn.setRequestProperty("User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36");
        conn.setRequestProperty("Upgrade-Insecure-Requests","1");
        conn.setRequestProperty("Pragma","no-cache");
        conn.setRequestProperty("Cache-Control","no-cache");

        // 서버로 전송
        try(DataOutputStream wr = new DataOutputStream(conn.getOutputStream())) {
            wr.write( postData );
            wr.flush();
        }


        for (Map.Entry<String, List<String>> header : conn.getHeaderFields().entrySet()) {
            for (String value : header.getValue()) {
                //System.out.println(header.getKey() +" : " + value);
            }
        }

        // 응답 내용(BODY) 구하기
        try (InputStream in = conn.getInputStream();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            byte[] buf = new byte[1024 * 8];
            int length = 0;
            while ((length = in.read(buf)) != -1) {
                out.write(buf, 0, length);
            }
            String output = new String(out.toByteArray(), "UTF-8");
            Document doc = Jsoup.parse(output);

            for(int i = 1; i<doc.select("table#gvList>tbody>tr").size(); i++){
                Element tr = doc.select("table#gvList>tbody>tr").get(i);
                String key = tr.select("td:nth-child(3)").text();
                String desc = tr.select("td:nth-child(9)").text();
                System.out.println(key + " : " + desc);
                res.put(key,desc);
            }
        }

        // 접속 해제
        conn.disconnect();
        return res;
    }
}
