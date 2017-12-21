package com.sample.entity.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.sample.entity.Result2Entity;

@Repository
public class Result2RepositoryManager {
	
	@PersistenceContext(name = "PersistenceUnit")
	private EntityManager em;

	@Transactional
	public void persist(Result2Entity sEntity) {

		em.persist(sEntity);

	}
	
	/**
	 * ユーザテーブル全件取得
	 * 
	 * @return
	 */
	public List<Result2Entity> getAllResult2(String user) {

		String sqlString = "select * from result2 where username = :user order by id asc";
		Query q = em.createNativeQuery(sqlString, Result2Entity.class);

		@SuppressWarnings("unchecked")
		List<Result2Entity> result2 = q.setParameter("user", user).getResultList();

		return result2;
	}
	

	/**
	 * insert
	 * @param result2
	 */
	@Transactional
	public void insertResult2(Result2Entity result2) {

		em.persist(result2);

	}
	
	/**
	 * delete
	 * @param user
	 * @return
	 */
	@Transactional
	public int deleteResult2(String user) {
		
		int result = em.createNamedQuery("Result2.byUser").setParameter("username", user).executeUpdate();
		return result;

	}



}
