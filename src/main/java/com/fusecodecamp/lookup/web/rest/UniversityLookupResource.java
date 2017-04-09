package com.fusecodecamp.lookup.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fusecodecamp.lookup.service.UniversityLookupService;
import com.fusecodecamp.lookup.service.dto.GovDataResponseDTO;
import com.fusecodecamp.lookup.service.util.DataGovUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URISyntaxException;

/**
 * Created by stephan.haller on 4/5/17.
 */

@RestController
@RequestMapping("/api")
public class UniversityLookupResource {

    private final Logger log = LoggerFactory.getLogger(UniversityLookupResource.class);

    private UniversityLookupService universityLookupService;

    public UniversityLookupResource(UniversityLookupService universityLookupService) {
        this.universityLookupService = universityLookupService;
    }

    @GetMapping("/universities")
    @Timed
    public ResponseEntity<String> getAllBySearchCriteria(@RequestParam(value = "name", required = false) String name,
                                                                @RequestParam(value = "city", required = false) String city,
                                                                @RequestParam(value = "state", required = false) String state,
                                                                @RequestParam(value = "zip", required = false) String zip,
                                                                @RequestParam(value = "inStateCost", required = false) String inStateCost,
                                                                @RequestParam(value = "outStateCost", required = false) String outStateCost,
                                                                @RequestParam(value = "sort", required = false) String sort,
                                                                @ApiParam Pageable pageable) throws URISyntaxException, IOException {

        final GovDataResponseDTO dataGovResponse = universityLookupService.getAllBySearchCriteria(name, city, state, zip, inStateCost, outStateCost, pageable, sort);
        HttpHeaders headers = DataGovUtil.generatePaginationHttpHeaders(dataGovResponse.getTotal(), dataGovResponse.getPage(), dataGovResponse.getPerPage(), "/api/universities");
        return new ResponseEntity<>(dataGovResponse.getResults(), headers, HttpStatus.OK);
    }
}
