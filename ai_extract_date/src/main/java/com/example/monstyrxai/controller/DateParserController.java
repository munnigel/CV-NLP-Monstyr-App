package com.example.monstyrxai.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.zoho.hawking.HawkingTimeParser;
import com.zoho.hawking.datetimeparser.configuration.HawkingConfiguration;
import com.zoho.hawking.language.english.model.DatesFound;
import com.zoho.hawking.language.english.model.ParsedDate;
import com.zoho.hawking.language.english.model.ParserOutput;

import edu.stanford.nlp.io.EncodingPrintWriter.out;

@RestController
public class DateParserController {

  // @PostMapping("/getdates")
  // public ArrayList<MonstyrDate> getDateObject(@RequestBody String inputText)
  // throws Exception {
  // MonstyrDate monstyrDate = new MonstyrDate();
  // ArrayList<MonstyrDate> outputList= monstyrDate.parseMonstyrDates(inputText);

  // // Gson gson = new Gson();
  // // return gson.toJson(datesFound);
  // return outputList;
  // }

  @CrossOrigin(origins = "*")
  @PostMapping("/getdates")
  public List<HashMap<String, String>> getDateObject(@RequestBody String inputText) throws Exception {
    HawkingTimeParser parser = new HawkingTimeParser();
    HawkingConfiguration hawkingConfiguration = new HawkingConfiguration();
    hawkingConfiguration.setFiscalYearStart(1);
    hawkingConfiguration.setFiscalYearEnd(12);
    hawkingConfiguration.setTimeZone("GMT+8");
    Date referenceDate = new Date();
    DatesFound datesFound = parser.parse(inputText, referenceDate, hawkingConfiguration, "eng");

    List<HashMap<String, String>> outputList = new ArrayList<HashMap<String, String>>();
    // outputMap.put(datesFound.getParserOutputs().get(0).getId(),
    // datesFound.getParserOutputs().get(0).getText());

    for (ParserOutput parserOutput : datesFound.getParserOutputs()) {
      HashMap<String, String> outputMap = new HashMap<String, String>();
      outputMap.put("text", parserOutput.getText());
      outputMap.put("start index", Integer.toString(parserOutput.getParserStartIndex()));
      outputMap.put("end index", Integer.toString(parserOutput.getParserEndIndex()));

      if (parserOutput.getDateRange().getStart() != null) {
        outputMap.put("start date", parserOutput.getDateRange().getStart().toString());
      }

      if (parserOutput.getDateRange().getEnd() != null) {
        outputMap.put("end date", parserOutput.getDateRange().getEnd().toString());
      }

      outputList.add(outputMap);
    }
    return outputList;
  }

  public static void main(String[] args) {
    SpringApplication.run(DateParserController.class, args);
  }

}
