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
        String inputText = "Stay cool and hydrated. Grab a refreshing beverage from our SPC Choices stores today! 😋 Promotion is valid till 28 February 2021 or while stocks last. Click here for our latest promotions: https://www.spc.com.sg/our-business/spc-service-station/latest-promotions/ #SPCSingapore #SPCChoices";
        HawkingConfiguration hawkingConfiguration = new HawkingConfiguration();
        hawkingConfiguration.setFiscalYearStart(1);
        hawkingConfiguration.setFiscalYearEnd(12);
        hawkingConfiguration.setTimeZone("IST");
        Date referenceDate = new Date();
        DatesFound datesFound = null;

        try {
            datesFound = parser.parse(inputText, referenceDate, hawkingConfiguration, "eng"); //No I18N
          } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
          }
          assert datesFound != null;
          LOGGER.info("DATES FOUND ::  "+ datesFound.toString());
        }
        // System.out.println( "Hello World!" );
    }

