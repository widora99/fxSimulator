package com.sample.entity.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.sample.entity.UserEntity;

@Repository
public class UserRepositoryManager {
	
	@PersistenceContext(name = "gitWidgetPersistenceUnit")
	private EntityManager em;

	@Transactional
	public void persist(UserEntity sEntity) {

		em.persist(sEntity);

	}
	
	/**
	 * 業務チェック実行結果のログを取得する全件いらないかも
	 * 
	 * @return
	 */
	public List<UserEntity> getSamples() {

		String sqlString = "select * from user order by id desc";
		Query q = em.createNativeQuery(sqlString, UserEntity.class);

		@SuppressWarnings("unchecked")
		List<UserEntity> samples = (List<UserEntity>) q.getResultList();

		return samples;
	}



}
