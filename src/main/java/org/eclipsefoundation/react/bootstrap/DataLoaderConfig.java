package org.eclipsefoundation.react.bootstrap;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import io.quarkus.arc.config.ConfigProperties;

/**
 * Configures the data loader for non-production sample data to be loaded for the service
 * 
 * @author Martin Lowe
 *
 */
@ConfigProperties(prefix = "eclipse.dataloader")
public class DataLoaderConfig {
    // set the internal values + default values
    private boolean enabled = false;
    private List<String> dataLoaderProfiles = Arrays.asList("dev", "staging");
    private Integer formCount = 25;
    private List<String> userIDs = Arrays.asList("user1", "user2", "user3");
    private List<String> workingGroups = Arrays.asList("internet-things-iot", "jakarta-ee", "cloud-tools-development");
    private List<String> membershipLevels = Arrays.asList("strategic", "contributing", "associate", "committer");
    private List<String> participationLevels = Arrays.asList("platinum", "gold", "silver", "associate");

    /**
     * @return the dataLoaderEnabled
     */
    public boolean isEnabled() {
        return enabled;
    }

    /**
     * @param enabled the enabled to set
     */
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * @return the dataLoaderProfiles
     */
    public List<String> getDataLoaderProfiles() {
        return new ArrayList<>(dataLoaderProfiles);
    }

    /**
     * @param dataLoaderProfiles the dataLoaderProfiles to set
     */
    public void setDataLoaderProfiles(List<String> dataLoaderProfiles) {
        this.dataLoaderProfiles = new ArrayList<>(dataLoaderProfiles);
    }

    /**
     * @return the formCount
     */
    public Integer getFormCount() {
        return formCount;
    }

    /**
     * @param formCount the formCount to set
     */
    public void setFormCount(Integer formCount) {
        this.formCount = formCount;
    }

    /**
     * @return the userIDs
     */
    public List<String> getUserIDs() {
        return new ArrayList<>(userIDs);
    }

    /**
     * @param userIDs the userIDs to set
     */
    public void setUserIDs(List<String> userIDs) {
        this.userIDs = new ArrayList<>(userIDs);
    }

    /**
     * @return the workingGroups
     */
    public List<String> getWorkingGroups() {
        return new ArrayList<>(workingGroups);
    }

    /**
     * @param workingGroups the workingGroups to set
     */
    public void setWorkingGroups(List<String> workingGroups) {
        this.workingGroups = new ArrayList<>(workingGroups);
    }

    /**
     * @return the membershipLevels
     */
    public List<String> getMembershipLevels() {
        return new ArrayList<>(membershipLevels);
    }

    /**
     * @param membershipLevels the membershipLevels to set
     */
    public void setMembershipLevels(List<String> membershipLevels) {
        this.membershipLevels = new ArrayList<>(membershipLevels);
    }

    /**
     * @return the participationLevels
     */
    public List<String> getParticipationLevels() {
        return new ArrayList<>(participationLevels);
    }

    /**
     * @param participationLevels the participationLevels to set
     */
    public void setParticipationLevels(List<String> participationLevels) {
        this.participationLevels = new ArrayList<>(participationLevels);
    }
}