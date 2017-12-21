package com.sample.entity.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.sample.entity.Result1Entity;

@Repository
public class Result1RepositoryManager {
	
	@PersistenceContext(name = "PersistenceUnit")
	private EntityManager em;

	@Transactional
	public void persist(Result1Entity sEntity) {

		em.persist(sEntity);

	}
	
	/**
	 * ユーザテーブル全件取得
	 * 
	 * @return
	 */
	public List<Result1Entity> getAllResult1(String user) {

		String sqlString = "select * from result1 where username = :user order by id asc";
		Query q = em.createNativeQuery(sqlString, Result1Entity.class);

		@SuppressWarnings("unchecked")
		List<Result1Entity> result1 = q.setParameter("user", user).getResultList();

		return result1;
	}
	

	/**
	 * insert
	 * @param result1
	 */
	@Transactional
	public void insertResult1(Result1Entity result1) {

		em.persist(result1);

	}
	
	/**
	 * delete
	 * @param user
	 * @return
	 */
	@Transactional
	public int deleteResult1(String user) {
		
		int result = em.createNamedQuery("Result1.byUser").setParameter("username", user).executeUpdate();
		return result;

	}



}
