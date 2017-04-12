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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by stephan.haller on 4/5/17.
 */

@Service
public class UniversityLookupService {

    @Autowired
    private ApplicationProperties applicationProperties;

    @Autowired
    private UserService userService;

    public GovDataResponseDTO getAllBySearchCriteria(String name, String city, String state, String zip, String inStateCost, String outStateCost, Pageable pageable, String sort) throws IOException {

        CloseableHttpClient httpclient = HttpClients.createDefault();

        StringBuffer result = new StringBuffer();
        String dataGovUrl = DataGovUtil.processDataGovUrl(applicationProperties.getApiDataGovUrl(), name, city, state, zip, inStateCost, outStateCost, pageable, sort);
        HttpGet httpGet = new HttpGet(dataGovUrl);
        httpGet.addHeader("X-Api-Key", applicationProperties.getApiDataGovKey());
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
            universityDTO.setId(universityObj.get("id").getAsLong());
            universityDTO.setName(universityObj.get("school.name").getAsString());
            universityDTO.setCity(universityObj.get("school.city").getAsString());
            universityDTO.setState(universityObj.get("school.state").getAsString());
            universityDTO.setZipCode(universityObj.get("school.zip").getAsString());

            universityDTOList.add(universityDTO);
        }

        responseDTO.setTotal(metadataNode.get("total").getAsInt());
        responseDTO.setPage(metadataNode.get("page").getAsInt());
        responseDTO.setPerPage(metadataNode.get("per_page").getAsInt());
        responseDTO.setUniversityDTOList(universityDTOList);

        return responseDTO;
    }
}
