package com.fusecodecamp.lookup.service.dto;

public class GovDataResponseDTO {

    private int total;

    private int page;

    private int perPage;

    private String results;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPerPage() {
        return perPage;
    }

    public void setPerPage(int perPage) {
        this.perPage = perPage;
    }

    public String getResults() {
        return results;
    }

    public void setResults(String results) {
        this.results = results;
    }
}
