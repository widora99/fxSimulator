package com.sample.entity.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.sample.entity.SampleEntity;

@Repository
public class SampleRepositoryManager {
	
	@PersistenceContext(name = "gitWidgetPersistenceUnit")
	private EntityManager em;

	@Transactional
	public void persist(SampleEntity sEntity) {

		em.persist(sEntity);

	}
	
	/**
	 * 業務チェック実行結果のログを取得する全件いらないかも
	 * 
	 * @return
	 */
	public List<SampleEntity> getSamples() {

		String sqlString = "select * from sample order by id desc";
		Query q = em.createNativeQuery(sqlString, SampleEntity.class);

		@SuppressWarnings("unchecked")
		List<SampleEntity> samples = (List<SampleEntity>) q.getResultList();

		return samples;
	}



}
