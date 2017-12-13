package com.sample.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class MainEntity {
	
	@Id
	private String id;
	
	@Column
	private String date;

	@Column
	private String time;
	
	@Column
	private String sell;
	
	@Column
	private String rule1;

	@Column
	private String rule2;
	
	@Column
	private String rule3;

	@Column
	private String fileter1;

	@Column
	private String fileter2;
	
	@Column
	private String fileter3;
	
	@Column
	private String fileter4;
	
	@Column
	private String fileter5;
	
	@Column
	private String fileter6;

	@Column
	private String memo;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getSell() {
		return sell;
	}

	public void setSell(String sell) {
		this.sell = sell;
	}

	public String getRule1() {
		return rule1;
	}

	public void setRule1(String rule1) {
		this.rule1 = rule1;
	}

	public String getRule2() {
		return rule2;
	}

	public void setRule2(String rule2) {
		this.rule2 = rule2;
	}

	public String getRule3() {
		return rule3;
	}

	public void setRule3(String rule3) {
		this.rule3 = rule3;
	}

	public String getFilter1() {
		return fileter1;
	}

	public void setFilter1(String fileter1) {
		this.fileter1 = fileter1;
	}

	public String getFilter2() {
		return fileter2;
	}

	public void setFilter2(String fileter2) {
		this.fileter2 = fileter2;
	}

	public String getFilter3() {
		return fileter3;
	}

	public void setFilter3(String fileter3) {
		this.fileter3 = fileter3;
	}

	public String getFilter4() {
		return fileter4;
	}

	public void setFilter4(String fileter4) {
		this.fileter4 = fileter4;
	}

	public String getFilter5() {
		return fileter5;
	}

	public void setFilter5(String fileter5) {
		this.fileter5 = fileter5;
	}

	public String getFilter6() {
		return fileter6;
	}

	public void setFilter6(String fileter6) {
		this.fileter6 = fileter6;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}
	

}
