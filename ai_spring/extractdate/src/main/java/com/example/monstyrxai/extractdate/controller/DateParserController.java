package com.example.monstyrxai.extractdate.controller;

import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zoho.hawking.HawkingTimeParser;
import com.zoho.hawking.datetimeparser.configuration.HawkingConfiguration;
import com.zoho.hawking.language.english.model.DatesFound;

@RestController
public class DateParserController {

  


    @PostMapping("/getdates")
    public String getDateObject(@RequestBody String inputText) throws Exception {
      HawkingTimeParser parser = new HawkingTimeParser();
      HawkingConfiguration hawkingConfiguration = new HawkingConfiguration();
      hawkingConfiguration.setFiscalYearStart(1);
      hawkingConfiguration.setFiscalYearEnd(12);
      hawkingConfiguration.setTimeZone("GMT+8");
      Date referenceDate = new Date();
      DatesFound datesFound = parser.parse(inputText, referenceDate, hawkingConfiguration, "eng");

      return datesFound.toString();    
    }


    public static void main(String[] args) {
      SpringApplication.run(DateParserController.class, args);
    }

    
}
