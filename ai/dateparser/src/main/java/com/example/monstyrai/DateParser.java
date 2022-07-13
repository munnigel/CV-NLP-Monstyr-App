package com.example.monstyrai;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zoho.hawking.HawkingTimeParser;
import com.zoho.hawking.datetimeparser.configuration.HawkingConfiguration;
import com.zoho.hawking.language.english.model.DatesFound;

public class DateParser {
  private static final Logger LOGGER = LoggerFactory
      .getLogger(DateParser.class);

  public static void main(String[] args) throws Exception {

    HawkingTimeParser parser = new HawkingTimeParser();
    String inputText = "Be the first 100 to LIKE and SHARE this post to win a $10 Baby Reward Voucher! 🍼👶🏻 Redeem* your vouchers in-store at our Baby Essentials Fair; happening from now to Wed 10 Mar 2021 at Children's Department, Level 4!* *Show us you have liked and shared the post to redeem your voucher with the staff in-store at our Children Cashier Counter next to the Baby Essentials Fair, Children’s Department, Level 4! #takashimayasg";
    HawkingConfiguration hawkingConfiguration = new HawkingConfiguration();
    hawkingConfiguration.setFiscalYearStart(1);
    hawkingConfiguration.setFiscalYearEnd(12);
    hawkingConfiguration.setTimeZone("GMT+8");
    Date referenceDate = new Date();
    DatesFound datesFound = null;

    try {
      datesFound = parser.parse(inputText, referenceDate, hawkingConfiguration, "eng"); // No I18N
    } catch (Exception e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    assert datesFound != null;
    LOGGER.info("DATES FOUND ::  " + datesFound.toString());
  }
  // System.out.println( "Hello World!" );
}
