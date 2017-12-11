package com.sample.controller;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.sample.entity.UserEntity;
import com.sample.entity.repository.UserRepositoryManager;

@Controller
public class SampleController {

	@Autowired
	private UserRepositoryManager sampleRepositoryManager ; 
	
	/**
	 * userテーブルのデータを返す
	 * 
	 * @return
	 *
	 */
	@RequestMapping(path = "/user", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String getUser(HttpServletRequest request, HttpServletResponse response) throws Exception {

		List<UserEntity> se = sampleRepositoryManager.getSamples();
		Gson gson = new Gson();
		
		return gson.toJson(se);
	}
	
	/**
	 * 管理画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/master", method = RequestMethod.GET)
	public ModelAndView maintenance(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("master");

		return mav;
	}
	
	/**
	 * メインシミュレーション画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/main", method = RequestMethod.GET)
	public ModelAndView mainSimulate(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("main");

		return mav;
	}
	
	/**
	 * 検証結果記録画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/result1", method = RequestMethod.GET)
	public ModelAndView result1(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("result1");

		return mav;
	}
	
	/**
	 * 検証結果記録画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/result2", method = RequestMethod.GET)
	public ModelAndView result2(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("result2");

		return mav;
	}
	
    @RequestMapping(value = "/excel", method = RequestMethod.POST)
    public @ResponseBody
    String excel(String excel, String extension, HttpServletRequest request) throws IOException {
        String filename="";
        if (extension.equals("csv") || extension.equals("xml")) {
            filename = "result." + extension;
            HttpSession ses = request.getSession(true);
            ses.setAttribute("excel", excel);
        } 
        return filename;
    }

    /**
     * PQGridをExcel/CSV出力する
     * @param filename
     * @param request
     * @param response
     * @throws IOException
     */
    @RequestMapping(value = "/excel", method = RequestMethod.GET)
    public void excel(String filename, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (filename.equals("result.csv") || filename.equals("result.xml")) {
            HttpSession ses = request.getSession(true);
            String excel = (String) ses.getAttribute("excel");
                        
            byte[] bytes = excel.getBytes(Charset.forName("MS932"));
                    
            response.setContentType("text/plain");
            
            response.setHeader("Content-Disposition",
                    "attachment;filename=" + filename);
            response.setContentLength(bytes.length);
            ServletOutputStream out = response.getOutputStream();
            out.write(bytes);
            
            out.flush();
            out.close();
        }
    }
	
}
