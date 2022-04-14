package com.wordle.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// UserController will dispatch certain events and actions depending on https requests

@RestController
@RequestMapping("/api/user")
public class UserController {

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<String> getUserData(@PathVariable int id) {
    // TODO:
    // Call a service to fetch neccesary data from db with the id
    // Return the json data if available (200)
    // Otherwise return null (404)
    return new ResponseEntity<>("getUserData", HttpStatus.OK);
  }

  @RequestMapping(value = "/handleWin/{id}", method = RequestMethod.POST)
  public ResponseEntity<String> handleWin(@PathVariable int id, @RequestParam int row) {
    // TODO:
    // Call a service to update all player stats to reflect the win (look at redux state)
    // Return 200 or 404
    return new ResponseEntity<>("handleWin", HttpStatus.OK);
  }

  @RequestMapping(value = "/incrementPlayed/{id}", method = RequestMethod.POST)
  public ResponseEntity<String> incrementPlayed(@PathVariable int id) {
    // TODO:
    // Call a service to update player play count with the id
    // Return 200 or 404
    return new ResponseEntity<>("incrementPlayed", HttpStatus.OK);
  }

  @RequestMapping(value = "/resetStreak/{id}", method = RequestMethod.POST)
  public ResponseEntity<String> resetStreak(@PathVariable int id) {
    // TODO:
    // Call a service to reset streak of of player with the id
    // Return 200 or 404
    return new ResponseEntity<>("resetStreak", HttpStatus.OK);
  }

  @RequestMapping(value = "/resetStats/{id}", method = RequestMethod.POST)
  public ResponseEntity<String> resetStats(@PathVariable int id) {
    // TODO:
    // Call a service to reset all stats of player with the id
    // Return 200 or 404
    return new ResponseEntity<>("resetStats", HttpStatus.OK);
  }
}
