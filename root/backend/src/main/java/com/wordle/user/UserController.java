package com.wordle.user;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

// UserController will dispatch certain events and actions depending on https requests

@RestController
@RequestMapping("/api/user")
public class UserController {

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  @RequestMapping(value = "", method = RequestMethod.GET)
  String helloUser(HttpServletRequest request) {
    String name = request.getParameter("name");
    logger.debug("DEBUG Message");
    logger.info("INFO Message");
    logger.warn("WARN Message");
    logger.error("ERROR Message");
    return String.format("Hello %s!", name != null ? name : "no one");
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  String getUserWithId(@PathVariable int id) {
    return String.format("Hello user at %d!", id);
  }

}
