package com.fusecodecamp.lookup.service.util;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by stephan.haller on 4/6/17.
 */
public class DataGovUtil {

    static {
        ArrayList<String> staticFieldList = new ArrayList<>();
        staticFieldList.add("id");
        staticFieldList.add("school.name");
        staticFieldList.add("school.city");
        staticFieldList.add("school.state");
        staticFieldList.add("school.zip");

        universityDataSetFieldList = staticFieldList;
    }

    static {
        ArrayList<String> staticFieldList = new ArrayList<>();
        staticFieldList.add("id");
        staticFieldList.add("school.name");
        staticFieldList.add("school.city");
        staticFieldList.add("school.state");
        staticFieldList.add("school.zip");
        staticFieldList.add("school.accreditor");
        staticFieldList.add("school.school_url");
        staticFieldList.add("school.price_calculator_url");
        staticFieldList.add("school.main_campus");
        staticFieldList.add("school.branches");
        staticFieldList.add("school.degrees_awarded.predominant");
        staticFieldList.add("school.degrees_awarded.highest");
        staticFieldList.add("school.ownership");
        staticFieldList.add("school.region_id"); // TODO
        staticFieldList.add("school.locale");
        staticFieldList.add("school.carnegie_basic"); // TODO
        staticFieldList.add("school.religious_affiliation"); // TODO
        staticFieldList.add("2014.admissions.admission_rate.overall");
        staticFieldList.add("2014.cost.tuition.in_state");
        staticFieldList.add("2014.cost.tuition.out_of_state");

        universityDetailsFieldList = staticFieldList;
    }

    public static final ArrayList<String> universityDataSetFieldList;

    public static final ArrayList<String> universityDetailsFieldList;

    public static boolean isStringNullOrEmpty(String str) {

        if( null == str || str.isEmpty() ) {
            return true;
        }
        return false;
    }

    public static boolean isListNullOrEmpty(List<?> list) {
        if( null == list || list.isEmpty() ) {
            return true;
        }
        return false;
    }

    public static String generateDataGovUrlWithQueryParameters(String url, String name, String city, String state, String zip, String inStateCostRange, String outStateCostRange, Pageable pageable, String sort ) {

        boolean queryParamAppended = false;
        StringBuffer processedUrl = new StringBuffer(url + "?");

        if(!isStringNullOrEmpty(name)) {
            processedUrl.append("school.name=");
            processedUrl.append(name.replace(" ", "%20"));
            queryParamAppended = true;
        }
        if(!isStringNullOrEmpty(city)) {
            if(queryParamAppended) {
                processedUrl.append("&");
            }
            processedUrl.append("school.city=");
            processedUrl.append(city.replace(" ", "%20"));
            queryParamAppended = true;
        }
        if(!isStringNullOrEmpty(state)) {
            if(queryParamAppended) {
                processedUrl.append("&");
            }
            processedUrl.append("school.state=");
            processedUrl.append(state);
            queryParamAppended = true;
        }
        if(!isStringNullOrEmpty(zip)) {
            if(queryParamAppended) {
                processedUrl.append("&");
            }
            processedUrl.append("school.zip=");
            processedUrl.append(zip);
            queryParamAppended = true;
        }
        if(!isStringNullOrEmpty(inStateCostRange)) {
            if(queryParamAppended) {
                processedUrl.append("&");
            }
            processedUrl.append("2014.cost.tuition.in_state__range=");
            processedUrl.append(inStateCostRange);
            queryParamAppended = true;
        }
        if(!isStringNullOrEmpty(outStateCostRange)) {
            if(queryParamAppended) {
                processedUrl.append("&");
            }
            processedUrl.append("2014.cost.tuition.out_of_state__range=");
            processedUrl.append(outStateCostRange);
            queryParamAppended = true;
        }

        if(queryParamAppended) {
            processedUrl.append("&");
        }
        processedUrl.append(generateDataGovFieldList(universityDataSetFieldList));
        queryParamAppended = true;

        return appendPageableAndSortParams(pageable, sort, queryParamAppended, processedUrl);
    }

    public static String generateDataGovUrlSearchingById( String url, long id ) {

        StringBuffer processedUrl = new StringBuffer(url + "?");
        processedUrl.append("id=");
        processedUrl.append(id);
        processedUrl.append("&");

        processedUrl.append(generateDataGovFieldList(universityDetailsFieldList));

        return processedUrl.toString();
    }

    public static HttpHeaders generatePaginationHttpHeaders(int total, int page, int perPage, String baseUrl) throws URISyntaxException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count", "" + Integer.toString(total));
        String link = "";
        if ((page + 1) < total) {
            link = "<" + generateUri(baseUrl, page + 1, perPage) + ">; rel=\"next\",";
        }
        // prev link
        if ((page) > 0) {
            link += "<" + generateUri(baseUrl, page - 1, perPage) + ">; rel=\"prev\",";
        }
        // last and first link
        int lastPage = 0;
        if (total > 0) {
            lastPage = total - 1;
        }
        link += "<" + generateUri(baseUrl, lastPage, perPage) + ">; rel=\"last\",";
        link += "<" + generateUri(baseUrl, 0, perPage) + ">; rel=\"first\"";
        headers.add(HttpHeaders.LINK, link);
        return headers;
    }

    private static String appendPageableAndSortParams(Pageable pageable, String sort, boolean queryParamAppended, StringBuffer processedUrl) {

        if(queryParamAppended) {
            processedUrl.append("&");
        }
        processedUrl.append("page=");
        processedUrl.append(pageable.getPageNumber());
        processedUrl.append("&");
        processedUrl.append("per_page=");
        processedUrl.append(pageable.getPageSize());
        if(!isStringNullOrEmpty(sort)) {
            processedUrl.append("&");
            processedUrl.append("_sort=");
            processedUrl.append(sort);
        }

        return processedUrl.toString();
    }

    private static String generateUri(String baseUrl, int page, int size) throws URISyntaxException {
        return UriComponentsBuilder.fromUriString(baseUrl).queryParam("page", page).queryParam("size", size).toUriString();
    }

    private static String generateDataGovFieldList(final ArrayList<String> arrayList) {
        StringBuilder stringBuilder = new StringBuilder("_fields=");
        for(int i = 0; i < arrayList.size(); i++) {
            String dataSetField = arrayList.get(i);
            stringBuilder.append(dataSetField);
            if( i < arrayList.size() - 1) {
                stringBuilder.append(",");
            }
        }

        return stringBuilder.toString();
    }
}
