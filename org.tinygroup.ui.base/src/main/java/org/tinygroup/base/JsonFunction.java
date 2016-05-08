package org.tinygroup.base;

import org.tinygroup.template.Template;
import org.tinygroup.template.TemplateContext;
import org.tinygroup.template.TemplateException;
import org.tinygroup.template.function.AbstractTemplateFunction;

import com.alibaba.fastjson.JSON;

public class JsonFunction extends AbstractTemplateFunction{

	public JsonFunction() {
		super("jsonConvert");
	}

	public Object execute(Template template, TemplateContext context,
			Object... parameters) throws TemplateException {
		try{
			String value = (String) parameters[0];
			return JSON.parse(value);
		}catch(Exception e){
			throw new TemplateException(e);
		}
	}

}

