package com.sample.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.NamedQueries;
import org.hibernate.annotations.NamedQuery;

@NamedQueries({
	  @NamedQuery(name = "Header.byUser", 
	     query = "delete from header m where m.username = :username")
	})
@Entity(name="header")
public class HeaderEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column
	private String username;
	
	@Column
	private String currency;
		
	@Column
	private String ranges;
	
	@Column
	private String term;

	@Column
	private String conditions;
	
	@Column
	private String cond1;
	
	@Column
	private String cond2;
	
	@Column
	private String cond3;
	
	@Column
	private String fil1;
	
	@Column
	private String fil2;
	
	@Column
	private String fil3;
	
	@Column
	private String fil4;
	
	@Column
	private String fil5;
	
	@Column
	private String fil6;

	
	
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

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getRanges() {
		return ranges;
	}

	public void setRanges(String ranges) {
		this.ranges = ranges;
	}

	public String getTerm() {
		return term;
	}

	public void setTerm(String term) {
		this.term = term;
	}

	public String getConditions() {
		return conditions;
	}

	public void setConditions(String conditions) {
		this.conditions = conditions;
	}

	public String getCond1() {
		return cond1;
	}

	public void setCond1(String cond1) {
		this.cond1 = cond1;
	}

	public String getCond2() {
		return cond2;
	}

	public void setCond2(String cond2) {
		this.cond2 = cond2;
	}

	public String getCond3() {
		return cond3;
	}

	public void setCond3(String cond3) {
		this.cond3 = cond3;
	}

	public String getFil1() {
		return fil1;
	}

	public void setFil1(String fil1) {
		this.fil1 = fil1;
	}

	public String getFil2() {
		return fil2;
	}

	public void setFil2(String fil2) {
		this.fil2 = fil2;
	}

	public String getFil3() {
		return fil3;
	}

	public void setFil3(String fil3) {
		this.fil3 = fil3;
	}

	public String getFil4() {
		return fil4;
	}

	public void setFil4(String fil4) {
		this.fil4 = fil4;
	}

	public String getFil5() {
		return fil5;
	}

	public void setFil5(String fil5) {
		this.fil5 = fil5;
	}

	public String getFil6() {
		return fil6;
	}

	public void setFil6(String fil6) {
		this.fil6 = fil6;
	}



	

}
