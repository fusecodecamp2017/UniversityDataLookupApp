package com.fusecodecamp.lookup.service;

import com.fusecodecamp.lookup.config.ApplicationProperties;
import com.fusecodecamp.lookup.service.dto.GovDataResponseDTO;
import com.fusecodecamp.lookup.service.dto.UniversityDTO;
import com.fusecodecamp.lookup.service.util.DataGovUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by stephan.haller on 4/5/17.
 */

@Service
public class UniversityLookupService {

    private final Logger log = LoggerFactory.getLogger(UniversityLookupService.class);

    static  {
        HashMap<Integer, String> staticMainCampusHashMap = new HashMap<>();
        staticMainCampusHashMap.put(0, "Not main campus");
        staticMainCampusHashMap.put(1, "Main campus");
        mainCampusHashMap = staticMainCampusHashMap;
    }

    static  {
        HashMap<Integer, String> staticDegreeAwardedPredominantHashMap = new HashMap<>();
        staticDegreeAwardedPredominantHashMap.put(0, "Not classified");
        staticDegreeAwardedPredominantHashMap.put(1, "Predominantly certificate-degree granting");
        staticDegreeAwardedPredominantHashMap.put(2, "Predominantly associate's-degree granting");
        staticDegreeAwardedPredominantHashMap.put(3, "Predominantly bachelor's-degree granting");
        staticDegreeAwardedPredominantHashMap.put(4, "Entirely graduate-degree granting");
        degreeAwardedPredominantHashMap = staticDegreeAwardedPredominantHashMap;
    }

    static  {
        HashMap<Integer, String> staticDegreeAwardedHighestHashMap = new HashMap<>();
        staticDegreeAwardedHighestHashMap.put(0, "Non-degree-granting");
        staticDegreeAwardedHighestHashMap.put(1, "Certificate degree");
        staticDegreeAwardedHighestHashMap.put(2, "Associate degree");
        staticDegreeAwardedHighestHashMap.put(3, "Bachelor's degree");
        staticDegreeAwardedHighestHashMap.put(4, "Graduate degree");
        degreeAwardedHighestHashMap = staticDegreeAwardedHighestHashMap;
    }

    static  {
        HashMap<Integer, String> staticOwnershipHashMap = new HashMap<>();
        staticOwnershipHashMap.put(1, "Public");
        staticOwnershipHashMap.put(2, "Private nonprofit");
        staticOwnershipHashMap.put(3, "Private for-profit");
        ownershipHashMap = staticOwnershipHashMap;
    }

    static  {
        HashMap<Integer, String> staticLocaleHashMap = new HashMap<>();
        staticLocaleHashMap.put(11, "City: Large (population of 250,000 or more)");
        staticLocaleHashMap.put(12, "City: Midsize (population of at least 100,000 but less than 250,000)");
        staticLocaleHashMap.put(13, "City: Small (population less than 100,000)");
        staticLocaleHashMap.put(21, "Suburb: Large (outside principal city, in urbanized area with population of 250,000 or more)");
        staticLocaleHashMap.put(22, "Suburb: Midsize (outside principal city, in urbanized area with population of at least 100,000 but less than 250,000)");
        staticLocaleHashMap.put(23, "Suburb: Small (outside principal city, in urbanized area with population less than 100,000)");
        staticLocaleHashMap.put(31, "Town: Fringe (in urban cluster up to 10 miles from an urbanized area)");
        staticLocaleHashMap.put(32, "Town: Distant (in urban cluster more than 10 miles and up to 35 miles from an urbanized area)");
        staticLocaleHashMap.put(33, "Town: Remote (in urban cluster more than 35 miles from an urbanized area)");
        staticLocaleHashMap.put(41, "Rural: Fringe (rural territory up to 5 miles from an urbanized area or up to 2.5 miles from an urban cluster)");
        staticLocaleHashMap.put(42, "Rural: Distant (rural territory more than 5 miles but up to 25 miles from an urbanized area or more than 2.5 and up to 10 miles from an urban cluster)");
        staticLocaleHashMap.put(43, "Rural: Remote (rural territory more than 25 miles from an urbanized area and more than 10 miles from an urban cluster)");
        localeHashMap = staticLocaleHashMap;
    }

    private static final HashMap<Integer, String> mainCampusHashMap;
    private static final HashMap<Integer, String> degreeAwardedPredominantHashMap;
    private static final HashMap<Integer, String> degreeAwardedHighestHashMap;
    private static final HashMap<Integer, String> ownershipHashMap;
    private static final HashMap<Integer, String> localeHashMap;

    @Autowired
    private ApplicationProperties applicationProperties;

    @Autowired
    private UserService userService;

    public GovDataResponseDTO getAllBySearchCriteria(String name, String city, String state, String zip, String inStateCostRange, String outStateCostRange, Pageable pageable, String sort) throws IOException {

        CloseableHttpClient httpclient = HttpClients.createDefault();

        StringBuffer result = new StringBuffer();
        String dataGovUrl = DataGovUtil.processDataGovUrl(applicationProperties.getApiDataGovUrl(), name, city, state, zip, inStateCostRange, outStateCostRange, pageable, sort);
        HttpGet httpGet = new HttpGet(dataGovUrl);
        httpGet.addHeader("X-Api-Key", applicationProperties.getApiDataGovKey());
        log.info("UniversityLookupService.getAllBySearchCriteria() - Api.data.gov Url: " + dataGovUrl );
        CloseableHttpResponse response = httpclient.execute(httpGet);

        try {
            System.out.println(response.getStatusLine());
            System.out.println("Response Code : " + response.getStatusLine().getStatusCode());
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

            String line;
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }
        }
        finally {
            response.close();
        }

        GovDataResponseDTO responseDTO = new GovDataResponseDTO();
        JsonElement jelement = new JsonParser().parse(result.toString());
        JsonObject rootNode = jelement.getAsJsonObject();
        JsonObject metadataNode = rootNode.getAsJsonObject("metadata");

        List<UniversityDTO> universityDTOList = new ArrayList<>();
        JsonArray universityArray = rootNode.getAsJsonArray("results");
        for( JsonElement universityEl : universityArray ) {
            UniversityDTO universityDTO = new UniversityDTO();
            JsonObject universityObj = universityEl.getAsJsonObject();
            if(!universityObj.get("id").isJsonNull())
                universityDTO.setId(universityObj.get("id").getAsLong());
            if(!universityObj.get("school.name").isJsonNull())
                universityDTO.setName(universityObj.get("school.name").getAsString());
            if(!universityObj.get("school.city").isJsonNull())
                universityDTO.setCity(universityObj.get("school.city").getAsString());
            if(!universityObj.get("school.state").isJsonNull())
                universityDTO.setState(universityObj.get("school.state").getAsString());
            if(!universityObj.get("school.zip").isJsonNull())
                universityDTO.setZipCode(universityObj.get("school.zip").getAsString());
            if(!universityObj.get("school.accreditor").isJsonNull())
                universityDTO.setAccreditor(universityObj.get("school.accreditor").getAsString());
            if(!universityObj.get("school.school_url").isJsonNull())
                universityDTO.setSchoolUrl(universityObj.get("school.school_url").getAsString());
            if(!universityObj.get("school.price_calculator_url").isJsonNull())
                universityDTO.setPriceCalculatorUrl(universityObj.get("school.price_calculator_url").getAsString());
            if(!universityObj.get("school.main_campus").isJsonNull())
                universityDTO.setMainCampus(mainCampusHashMap.get(universityObj.get("school.main_campus").getAsInt()));
            if(!universityObj.get("school.branches").isJsonNull())
                universityDTO.setBranches(universityObj.get("school.branches").getAsInt());
            if(!universityObj.get("school.degrees_awarded.predominant").isJsonNull())
                universityDTO.setDegreesAwardedPredominant(degreeAwardedPredominantHashMap.get(universityObj.get("school.degrees_awarded.predominant").getAsInt()));
            if(!universityObj.get("school.degrees_awarded.highest").isJsonNull())
                universityDTO.setDegreesAwardedHighest(degreeAwardedHighestHashMap.get(universityObj.get("school.degrees_awarded.highest").getAsInt()));
            if(!universityObj.get("school.ownership").isJsonNull())
                universityDTO.setOwnership(ownershipHashMap.get(universityObj.get("school.ownership").getAsInt()));
            if(!universityObj.get("school.locale").isJsonNull())
                universityDTO.setLocale(localeHashMap.get(universityObj.get("school.locale").getAsInt()));
            if(!universityObj.get("2014.admissions.admission_rate.overall").isJsonNull()) {
                BigDecimal adminRate = universityObj.get("2014.admissions.admission_rate.overall").getAsBigDecimal();
                adminRate = adminRate.multiply(new BigDecimal("100"));
                universityDTO.setAdmissionRateOverall(adminRate.toString());
            }
            if(!universityObj.get("2014.cost.tuition.in_state").isJsonNull()) {
                universityDTO.setInStateTuitionCost(universityObj.get("2014.cost.tuition.in_state").getAsString());
            }
            if(!universityObj.get("2014.cost.tuition.out_of_state").isJsonNull()) {
                universityDTO.setOutStateTuitionCost(universityObj.get("2014.cost.tuition.out_of_state").getAsString());
            }

            universityDTOList.add(universityDTO);
        }

        responseDTO.setTotal(metadataNode.get("total").getAsInt());
        responseDTO.setPage(metadataNode.get("page").getAsInt());
        responseDTO.setPerPage(metadataNode.get("per_page").getAsInt());
        responseDTO.setUniversityDTOList(universityDTOList);

        return responseDTO;
    }


}
