package com.example.monstyrai;


import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zoho.hawking.HawkingTimeParser;
import com.zoho.hawking.datetimeparser.configuration.HawkingConfiguration;
import com.zoho.hawking.language.english.model.DatesFound;


public class DateParser 
{
    private static final Logger LOGGER = LoggerFactory
      .getLogger(DateParser.class);
    public static void main( String[] args ) throws Exception
    {

        HawkingTimeParser parser = new HawkingTimeParser();
        String inputText = "Enjoy 10% OFF your Air Fryer Oven purchase when you pay using GrabPay! Make sure you use the code 'AFOGrab10' at checkout to take home the Air Fryer Oven for $359.1 (from $399). Get a FREE GIFT worth $88 and a chance to earn x2 Grab Reward Points - ONLY until Oct 28!  Don't miss out: https://bit.ly/FBOAirFryerOvenGrabPay!";
        HawkingConfiguration hawkingConfiguration = new HawkingConfiguration();
        hawkingConfiguration.setFiscalYearStart(1);
        hawkingConfiguration.setFiscalYearEnd(12);
        hawkingConfiguration.setTimeZone("SST");
        Date referenceDate = new Date();
        DatesFound datesFound = null;

        try {
            datesFound = parser.parse(inputText, referenceDate, hawkingConfiguration, "eng"); //No I18N
          } catch (Exception e) {
            // TODO Auto-generated catch block
            // e.printStackTrace();
          }
          // assert datesFound != null;
          // LOGGER.info("DATES FOUND ::  "+ datesFound.toString());
          System.out.println("\n");
          System.out.println("\n");
          System.out.println(datesFound.toString());
      }
        // System.out.println( "Hello World!" );
    }

