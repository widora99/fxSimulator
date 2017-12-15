package com.sample.entity.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.sample.entity.MainEntity;

@Repository
public class MainRepositoryManager {
	
	@PersistenceContext(name = "PersistenceUnit")
	private EntityManager em;

	@Transactional
	public void persist(MainEntity sEntity) {

		em.persist(sEntity);

	}
	
	/**
	 * ユーザテーブル全件取得
	 * 
	 * @return
	 */
	public List<MainEntity> getAllMain(String user) {

		String sqlString = "select * from main where username = :user";
		Query q = em.createNativeQuery(sqlString, MainEntity.class);

		@SuppressWarnings("unchecked")
		List<MainEntity> mains = q.setParameter("user", user).getResultList();

		return mains;
	}
	

	@Transactional
	public void insertMain(MainEntity main) {

		em.persist(main);

	}
	
	@Transactional
	public int deleteMain(String user) {
		
		int result = em.createNamedQuery("Main.byUser").setParameter("username", user).executeUpdate();
		return result;

	}



}
