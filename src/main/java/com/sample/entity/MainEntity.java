package com.sample.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.NamedQueries;
import org.hibernate.annotations.NamedQuery;

@NamedQueries({
	  @NamedQuery(name = "Main.byUser", 
	     query = "delete from main m where m.username = :username")
	})
@Entity(name="main")
public class MainEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column
	private String username;
		
	@Column
	private String date;
	
	@Column
	private String day;

	@Column
	private String time;
	
	@Column
	private String market;
	
	@Column
	private String sell;
	
	@Column
	private String rule1;

	@Column
	private String rule2;
	
	@Column
	private String rule3;

	@Column
	private String filter1;

	@Column
	private String filter2;
	
	@Column
	private String filter3;
	
	@Column
	private String filter4;
	
	@Column
	private String filter5;
	
	@Column
	private String filter6;

	@Column
	private String memo;

	
	
	public Integer  getId() {
		return id;
	}

	public void setId(Integer  id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}
	
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
		
	public String getMarket() {
		return market;
	}

	public void setMarket(String market) {
		this.market = market;
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
		return filter1;
	}

	public void setFilter1(String filter1) {
		this.filter1 = filter1;
	}

	public String getFilter2() {
		return filter2;
	}

	public void setFilter2(String filter2) {
		this.filter2 = filter2;
	}

	public String getFilter3() {
		return filter3;
	}

	public void setFilter3(String filter3) {
		this.filter3 = filter3;
	}

	public String getFilter4() {
		return filter4;
	}

	public void setFilter4(String filter4) {
		this.filter4 = filter4;
	}

	public String getFilter5() {
		return filter5;
	}

	public void setFilter5(String filter5) {
		this.filter5 = filter5;
	}

	public String getFilter6() {
		return filter6;
	}

	public void setFilter6(String filter6) {
		this.filter6 = filter6;
	}

	public String getMemo() {
		return memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}
	

}
