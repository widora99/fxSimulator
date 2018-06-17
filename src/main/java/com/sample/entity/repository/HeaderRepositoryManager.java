package com.sample.entity.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.sample.entity.HeaderEntity;

@Repository
public class HeaderRepositoryManager {
	
	@PersistenceContext(name = "PersistenceUnit")
	private EntityManager em;

	@Transactional
	public void persist(HeaderEntity sEntity) {

		em.persist(sEntity);

	}
	
	/**
	 * ヘッダテーブル自ユーザ取得
	 * 
	 * @return
	 */
	public HeaderEntity getHeader(String user) {

		String sqlString = "select * from header where username = :user";
		Query q = em.createNativeQuery(sqlString, HeaderEntity.class);

		HeaderEntity header = (HeaderEntity)q.setParameter("user", user).getSingleResult();

		return header;
	}
	

	/**
	 * insert
	 * @param header
	 */
	@Transactional
	public void insertHeader(HeaderEntity header) {

		em.persist(header);

	}
	
	/**
	 * delete
	 * @param user
	 * @return
	 */
	@Transactional
	public int deleteHeader(String user) {
		
		int result = em.createNamedQuery("Header.byUser").setParameter("username", user).executeUpdate();
		return result;

	}



}
