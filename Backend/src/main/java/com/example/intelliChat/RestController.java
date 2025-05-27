package com.example.Intellichat;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class RestController {

	@RequestMapping("/test")
	public String test() {
		return "just testing";
	}
}
